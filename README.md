# Installation :



**Clone the repo.**

 run **npm install** from within the project root then run **nodemon serve** or **node serve**
 
 


# Technicals requirements

![technicals](https://user-images.githubusercontent.com/32814329/57474145-c1472380-7291-11e9-918d-47e30b62dc1e.png)
![technicals2](https://user-images.githubusercontent.com/32814329/57474147-c1dfba00-7291-11e9-8b7a-a9523e5c7e68.png)
![technicals3](https://user-images.githubusercontent.com/32814329/57474148-c1dfba00-7291-11e9-9561-e3deafdac6da.png)

The data model for a sauce is as follows:

-   **_id**: _String_ — the unique identifier created by MongoDB
-   **userId**: _String_ — the MongoDB unique identifier for the user who created the sauce
-   **name**: _String_ — name of the sauce
-   **manufacturer**: _String_ — manufacturer of the sauce
-   **description**: _String_ — description of the sauce
-   **mainPepper**: _String_ — the main pepper ingredient in the sauce
-   **imageUrl**: _String_ — the URL for the picture of the sauce uploaded by the user
-   **heat**: _Number_ — number between 1 and 10 describing the sauce
-   **likes**: _Number_ — number of users liking the sauce
-   **dislikes**: _Number_ — number of users disliking the sauce
-   **usersLiked**: _[String]_ — array of user IDs of users having liked the sauce
-   **usersDisliked**: _[String]_ — array of user IDs of users having disliked the sauce

The data model for a user is as follows:

-   **email**: _String_ — the user's email address **[unique]**
-   **password**: _String_ — hash of the user's password
