import axios from 'axios';
const Card = (article) => {
    // TASK 5
    // ---------------------
    // Implement this function, which should return the markup you see below.
    // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
    // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
    // The text inside elements will be set using their `textContent` property (NOT `innerText`).
    // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
    //
    // <div class="card">
    //   <div class="headline">{ headline }</div>
    //   <div class="author">
    //     <div class="img-container">
    //       <img src={ authorPhoto }>
    //     </div>
    //     <span>By { authorName }</span>
    //   </div>
    // </div>

    const cardDiv = document.createElement('div');
    const hedlineDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const imgCont = document.createElement('div');
    const authFoto = document.createElement('img');
    const authName = document.createElement('span');

    hedlineDiv.textContent = article.headline;
    authFoto.src = article.authorPhoto;
    authName.textContent = article.authorName;

    cardDiv.classList.add('card');
    hedlineDiv.classList.add('headline');
    authorDiv.classList.add('author');
    imgCont.classList.add('img-container');

    cardDiv.append(hedlineDiv, authorDiv );
    authorDiv.append( imgCont, authName );
    imgCont.appendChild(authFoto);

    let cardTags = document.getElementsByClassName('.card');
    Array.from(cardTags).forEach( (cardTag) => {
        cardTag.addEventListener('click', console.log(hedlineDiv))
    } )

    return cardDiv;
}

const cardAppender = (selector) => {
    // TASK 6
    // ---------------------
    // Implement this function that takes a css selector as its only argument.
    // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
    // However, the articles do not come organized in a single, neat array. Inspect the response closely!
    // Create a card from each and every article object in the response, using the Card component.
    // Append each card to the element in the DOM that matches the selector passed to the function.
    //
    axios
        .get(`http://localhost:5000/api/articles`)
        .then(res => {
            // console.log(res.data.articles);

            let targetElem = document.querySelector(selector);

            let bootStraps = res.data.articles.bootstrap;
            let javaScripts = res.data.articles.javascript;
            let jquerYs = res.data.articles.jquery;
            let nodEs = res.data.articles.node;
            let techNologys = res.data.articles.technology;

            bootStraps.forEach( bootStrap => {
                targetElem.append(Card(bootStrap));
            });

            javaScripts.forEach( javaScript => {
                targetElem.append(Card(javaScript));
            });

            jquerYs.forEach( jquerY => {
                targetElem.append(Card(jquerY));
            });

            nodEs.forEach( nodE => {
                targetElem.append(Card(nodE));
            });

            techNologys.forEach( techNology => {
                targetElem.append(Card(techNology));
            })


        })
        .catch( err =>{
            console.error(err);
        })
}

export { Card, cardAppender }
