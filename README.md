Nglr Rnk

The goal was to create an app that would rank Angular repositories contributors and show them in one list.
The rank should be filterable by amount of contributions made by developer to all Angular repositories, by amount of followers, public repos & gists he/she published.
The details page of each contributor should be view with all repositories he contributed to and his details.
One should be able to navigate to repository details page where we can find other contributors


The real gotcha here is that Github doesn't have one simple ellegant API where one can get a list of contributors with amount of followers, public repos and gists.


The only solution to get this problem around is to make use of different APIs to get a list of all repos used by an organization (for example 'angular' in our case).
Having got the list of all repos one can iterate the list one by one  to get a list  of all contributors of a repo. This way one can get the number of contribusions of a contributor but to get the amount of followers, public repos and gist one stilll has to call another API.

The drawback of the above solution is the amount of requests made to the Github server.  Github has a severe API restriction as to the allowed amount of request to the unregistered users.
To overcome this obstacle the personal access token was included in the header of each request to the Github server.


About the source code:
The heart of the application is Rank Controller and rank view.  
These two files rank.js and rank.html are separated from the rest and placed in seperate directory 'Rank' on purpose and just for your convenience.

Rank controller in rank.js contains a function called 'staticticsFireUp' which makes this all happen.

All services are in js/services.js  This file contains all the API to communicate with Github server.


Acknowledgements:
To save time and not to invent a wheel anew my thanks go to https://github.com/daha/angularJS-github-contributors
It is based heavily on YUI css grid library which I got rid of and instead made use of bootstrap. Besides a few slight modifications were made.

Last but not least: you are allowed to do with this code what you want.

Enjoy!



