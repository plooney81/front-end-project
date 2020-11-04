# **[Dine-In Doggos](https://plooney81.github.io/front-end-project/)** <!-- omit in toc -->

Dine-In Doggos is a website built for dealing with an age-old question: Can we take our best buddy with us when we go out to our favorite restaurants? If you're anything like us, you have often wondered what restaurants in your area allow man's best friend to come with you, and Dine-In Doggos is your site!

- [**General**](#general)
- [**How it works** and **How to Use**](#how-it-works-and-how-to-use)
- [**Project Description** and **Requirements**](#project-description-and-requirements)
- [**What We Learned**](#what-we-learned)
- [**Credit** and **Licenses**](#credit-and-licenses)

## **General**

Dine-In Doggos was built using the following technologies and libraries:
* jQuery
* Boostrap
* Ajax
* JSON
* JavaScript
* HTML
* CSS

Our team members were: [Dasom Huber](https://github.com/DasomAnH), [Katherine Frain](https://github.com/katherfrain), and [Peter Looney](https://github.com/plooney81).

* API King: Pete Looney
* Empress of Buttons: Kate Frain
* CSS QUEEN: Dasom

-Pete wrote a function to utilize the Google Place API to allow users to search dog-friendly restaurants, isolating 'dog-friendly' by parsing reviews for keywords

-Kate integrated the API calls with our html via render strings

-Dasom made everything gorgeous via CSS

-Team members worked together to make Dog CEO API return random dog pictures if users submitted unsupported file types to the About Me section

## **How it works** and **How to Use**

Dine-In Doggoes uses Google Maps GeoCode API and Places JavaScript library to find nearby restaurants (once the user enters a city or address) that reviewers have said are dog- or pet-friendly. Each restaurant review returned by the Google Places Library is searched for 'dog', 'animal', or 'pet-friendly' via RegEx, and the positive instances are used to calculate a confidence rating that the restaurant is indeed pet-friendly.

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

From here, users can vote on whether or not they agree with Dine-In Doggos' dog-friendliness assessment by clicking either the Pawsitively Friendly button or the Doesn't Accept Dogs. These are saved in the local storage for the user. Once navigated to the *_Fetch_* page, the user can find a list of their favorite restaurants and parks (and least favorite) retrieved from local storage.

Also, check out the Play page, which uses similar API's to find local dog parks in the area.

## **Project Description** and **Requirements**
Our team was tasked with creating a front-end website MVP in less than a week using the techniques and technologies we had learned during the previous five weeks attending the DigitalCrafts Immersive Web Design bootcamp.

The Requirements for the project were as follows: 
* Implement Responsive Design
* Access at least two remote APIs
* Well Structured HTML
* JavaScript loads correctly and without any console errors.

## **What We Learned**

Throughout the project, the group overcame many obstacles. These included:
* GitHub conflicts and stale branches
* Promises within functions and using the async await key words
* Retrieving information from JSON formats
* Creating a project entirely remotely
* Dealing with capped usage on free APIs
* Testing functionality in a usage-capped environment
* Standardizing render strings after design changes


## **Credit** and **Licenses**
* The Dine-In Doggo Logo was created by Font Awesome:
[Font Awesome License](https://fontawesome.com/license)
