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


## **How it works**

Dine-In Doggoes uses Google Maps GeoCode API and Places JavaScript library to find nearby restaurants and present the user with restaurants that reviewers have said are dog or pet friendly. Each restaurant review returned by the Google Places Library is tested against a Regular Expression of Dog, animal, or Pet friendly. Each instance of a positive regular expression search for a Restaurant increases their chance of being a dog friendly and presented to the user by way of a beautiful render function.

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

From here, users can vote on weather or not they agree with Dine-In Doggos and vote if 

## **How To Use**