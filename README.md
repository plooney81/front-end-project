# **Dine-In Doggos**

Dine-In Doggos is a website built for dealing with the age-old question; Can we take our best buddy with us when we go out to our favorite restaurants? If your anything like us, you have often wondered what restaurants in your area allow Man's best friend to come with you? Then Dine-In Doggos is your site!

## **General**

Dine-In Doggos was built using the following technologies and libraries:
* Jquery
* Boostrap
* Ajax
* JSON
* JavaScript
* HTML
* CSS.

Our team members were: [Dasom Huber](https://github.com/DasomAnH), [Katherine Frain](https://github.com/katherfrain), and [Peter Looney](https://github.com/plooney81).

* API King: Pete Looney
* Empress of Buttons: Kate Frain
* CSS QUEEN: Dasom

-Pete wrote a function to utilize the Google Place API to allow users to search dog-friendly restaurants, isolating 'dog-friendly' by parsing reviews for keywords

-Kate integrated the API calls with our html via render strings

-Dasom made everything gorgeous via CSS

-Team members worked together to make Dog CEO API return random dog pictures if users submitted unsupported file types to the About Me section

## **How it works** and **How To Use**

Dine-In Doggoes uses Google Maps GeoCode API and Places JavaScript library to find nearby restaurants (once the user enters a city or address) and present the user with restaurants that reviewers have said are dog or pet friendly. Each restaurant review returned by the Google Places Library is tested against a Regular Expression of Dog, animal, or Pet friendly. Each instance of a positive regular expression search for a Restaurant increases their chance of being a dog friendly and presented to the user by way of a beautiful render function.

```JavaScript
     if(regex.test(currentReview.text)){
        if (dogFriendlyRestaurants[place.name]){
            dogFriendlyRestaurants[place.name].frequency += 1;
        }else{
            dogFriendlyRestaurants[place.name] = {
                'restaurantName' : place.name, 
                'frequency': 1, 
                'rating': place.rating, 
                'reviews': place.reviews,
                'pic': '#'
            };
```
![Eats Page Preview](./screenShot.png)

From here, users can vote on whether or not they agree with Dine-In Doggos by clicking either the Pawsitively Friendly button or the Doesn't Accept Dogs. These are saved in the local storage for the user. Once navigated to the *_Fetch_* page, the user can review their favorite or disliked restaurants.

Also, check out the Play page, which uses similar API's to find local dog parks in the area.

## **Project Description** and **Requirements**
Our team was tasked with creating a Front End Website in less than a week using the Techniques and Technologies we had learned during the previous five weeks attending the Digital Crafts Immersive Web Design boot camp.

The Requirements for the project were as follows: 
* Implement Responsive Design
* Access at least two remote APIs
* Well Structured HTML
* JavaScript loads correctly and without any console errors.

## **What We Learned**

Throughout the project, the group overcame many obstacles. These included:
* GitHub conflicts
* Promises within Functions and using the async await key words.
* Not all API's are free!
* Lets
* Add
* Some
* More


## **Credit** and **Licenses**
* The Dine-In Doggo Logo was created by Font Awesome:
[Font Awesome License](https://fontawesome.com/license)
