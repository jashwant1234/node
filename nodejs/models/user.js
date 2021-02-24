// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;
// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   addToCart(product) {
//     // const cartProduct = this.cart.items.findIndex(cp => {
//     //     return cp._id === product._id;
//     // });
//     const updatedCart = { items: [{ ...product, quntity: 1 }] };
//     const db = getDb();
//     return db
//       .collection("user")
//       .updateOne(
//         { _id: new mongodb.ObjectId(_id) },
//         { $set: { cart: updatedCart } }
//       );
//   }
//   save() {
//     const db = getDb();
//     return db
//       .collection("user")
//       .insertOne(this)
//       .then(() => {
//         console.log("one user insert");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("user")
//       .find({ _id: new mongodb.ObjectId(userId) })
//       .next()
//       .then((result) => {
//         console.log(result);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
// module.exports = User;
