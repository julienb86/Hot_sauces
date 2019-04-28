const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauces = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + req.file.filename,
        heat: req.body.sauce.heat,
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