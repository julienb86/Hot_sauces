const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauces = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + "/images/" + req.file.filename,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauces.save().then(
        () => {
            res.status(201).json({
                message: 'Sauce added successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error : error
            });
        }
    );
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id : req.params.id
        
    }).then(
        (sauce) => {
            res.status(200).json(sauce)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error : error
            });
        }
    );
}

exports.modifySauce = (req, res, next) => {
    let sauces = new Sauce({_id : req.params._id});
    if (req.file){
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauces = {
            userId: req.body.sauce.userId,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + "/images/" + req.file.filename,
            heat: req.body.sauce.heat
        };
    }else{
        sauces = {
            _id: req.params.id,
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat
        };
    }
    Sauce.updateOne({_id: req.params.id}, sauces).then(
        () => {
            res.status(201).json({
                message : "Sauce successfully updated!"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error : error
            });
        }
    );
};


exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id}).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message : "Sauce deleted!"
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
}


exports.likes = (req, res, next) => {
    /* if user likes the sauce */
    if (req.body.like === 1){
        Sauce.findOne({_id : req.params.id}).then(
            (sauce) => {
    /* the user has already added a like */
                if (!sauce.usersLiked.includes(req.body.userId)){
                    sauce.likes = sauce.likes + 1;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "User liked the sauce"
                            });
                        }
                    ).catch(
                        (error) => {
                            error : error
                        }
                    );

                }else {
                    res.status(401).json(
                        (error) => {
                            error : new Error("User has already liked the sauce")
                        }
                    );
                }
            }
        );
        /* user cancels the like or the dislike */
    } else if (req.body.like === 0){
        Sauce.findOne({_id : req.params.id}).then(
            (sauce) => {
                /* if the user clicks on the like, it cancels his like  */
                if(sauce.usersLiked.includes(req.body.userId)){
                    sauce.usersLiked = sauce.usersLiked.filter(user => user !== req.body.userId);
                    sauce.likes = sauce.likes - 1;
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "user cancels his previous like"
                            });
                        }
                    ).catch (
                        (error) => {
                            res.status(401).json({
                                error : error
                            });
                        }
                    );
                } else {
                    /* if the user clicks on the dislike, it cancels his dislike */
                    sauce.usersDisliked = sauce.usersDisliked.filter(user => user !== req.body.userId);
                    sauce.dislikes = sauce.dislikes - 1;
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "users cancels his previous dislike"
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error : error
                            });
                        }
                    );
                }
            }
        );
        /* user dislikes the sauce */
    } else {
        Sauce.findOne({_id : req.params.id}).then(
            (sauce) => {
                if(!sauce.usersDisliked.includes(req.body.userId)){
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes = sauce.dislikes + 1;
                    sauce.save().then(
                        () => {
                            res.status(201).json({
                                message : "User dislikes the sauce"
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(401).json({
                                error : error
                            });
                        }
                    );
                } else {
                    res.status(400).json({
                        error : new Error("Request not valid")
                    });
                }

            }
        );

    }
}

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


