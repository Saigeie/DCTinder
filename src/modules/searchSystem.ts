// Search for random user, next option, back option, like & dislike option

import userIds, { UserIds } from "../database/userIds";
import { Users } from "../database/users";
import { config } from "dotenv";
config()

const recentChecked = []

//! Need to do


// export const CheckRecentChecked = async (userId: string) => {
//     return recentChecked.includes(`${userId}`) ? true : false;
// };

// export const Search = async (signedInUser: Users) => {
//   let userId: string;
//   const userIdList = (await userIds.findOne({
//     key: `${process.env.KEY}`,
//   })) as UserIds;
//     //@ts-ignore 
//     const foundUser = await userIdList.userIds[Math.floor(Math.random(userIdList.userIds.length))];
//   userId = foundUser;
//   if (CheckRecentChecked(userId)) {
//        userId = await userIdList.userIds[
//          //@ts-ignore
//          Math.floor(Math.random(userIdList.userIds.length))
//        ];
//   } else {
//       recentChecked.push(userId)
//  }
//   return `/profile/${userId}?random=true` as String;
// }

export const Back = async () => {}

export const Link = async () => {};

export const Unlike = async () => {};
