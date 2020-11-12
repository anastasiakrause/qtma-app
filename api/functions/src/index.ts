import * as functions from 'firebase-functions';
import * as faker from 'faker';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

let posts: { name: any; price: any; }[] = [];
const POSTLIMIT  = 20;

for (let i=0; i < POSTLIMIT; i++)
{
    posts.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price()
    });
}

//exports.listPosts = functions.https.onCall((data, context) => {
//    return posts;
//});

export const listPosts = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send(posts);
});
