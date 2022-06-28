import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

exports.newMessage = functions.firestore
    .document("/chats/{uid}/participantes/{oUid}/mensajes/{id}")
    .onCreate(async (event) => {
      const mensaje = event.data();
      console.log("newMensaje creado");


      const path = "/users/" + mensaje.toUid;

      const docInfo = await firestore.doc(path).get();
      const dataUser = docInfo.data() as any;
      const token = dataUser.pushToken.token;

      const registrationTokens = [token];

      const dataFcm = {
        enlace: "/chats",
      };

      const notification: INotification = {
        data: dataFcm,
        tokens: registrationTokens,
        notification: {
          title: "Nuevo mensaje",
          body: "Tienes un nuevo mensaje ",
        },
      };

      return sendNotification(notification);
    });

const sendNotification = (notification: INotification) => {
  return new Promise((resolve) => {
    const message: admin.messaging.MulticastMessage = {
      data: notification.data,
      tokens: notification.tokens,
      notification: notification.notification,
      android: {
        notification: {
          icon: "ic_stat_name",
          color: "#EB9234",
        },
      },
      apns: {
        payload: {
          aps: {
            sound: {
              critical: true,
              name: "default",
              volume: 1,
            },
          },
        },
      },

    };

    console.log("List of tokens send", notification.tokens);

    admin.messaging().sendMulticast(message)
        .then((response) => {
          if (response.failureCount > 0) {
            const failedTokens: any[] = [];
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                failedTokens.push(notification.tokens[idx]);
              }
            });
            console.log("List of tokens that caused failures: " + failedTokens);
            // elimnar tokens
          } else {
            console.log("Send notification exitoso -> ");
          }
          resolve(true);
          return;
        }).catch( (error) => {
          console.log("Send fcm falló -> ", error);
          resolve(false);
          return;
        });
  });
};


interface INotification {
  data: any;
  tokens: string[];
  notification: admin.messaging.Notification;
}
