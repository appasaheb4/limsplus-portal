/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
 import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
 import { stores } from "@lp/stores"
 import {
   LIST,
   CREATE_RECORD,
   REMOVE_RECORD,
   UPDATE_RECORD,
   CHECK_EXISTS_RECORD,
 } from "./mutation"
 
 export class SegmentMappingService {
  listSegmentMapping = (page = 0, limit = 10) =>
     new Promise<any>((resolve, reject) => {
       const env = stores.loginStore.login && stores.loginStore.login.environment
       const role = stores.loginStore.login && stores.loginStore.login.role
       client
         .mutate({
           mutation: LIST,
           variables: { input: { page, limit, env, role } },
         })
         .then((response: any) => {
           stores.dataConversationStore.updateDataConversationList(response.data)
           resolve(response.data)
         })
         .catch((error) =>
           reject(new ServiceResponse<any>(0, error.message, undefined))
         )  
     })   

     mappingList = (page = 0, limit = 10) =>
     new Promise<any>((resolve, reject) => {
       const env = stores.loginStore.login && stores.loginStore.login.environment
       const role = stores.loginStore.login && stores.loginStore.login.role
       client
         .mutate({
           mutation: LIST,
           variables: { input: { page, limit, env, role } },
         })
         .then((response: any) => {
           stores.dataConversationStore.updateDataConversationList(response.data)
           resolve(response.data)
         })
         .catch((error) =>
           reject(new ServiceResponse<any>(0, error.message, undefined))
         )  
     })  

     importSegmentMapping = (page = 0, limit = 10) =>
     new Promise<any>((resolve, reject) => {
       const env = stores.loginStore.login && stores.loginStore.login.environment
       const role = stores.loginStore.login && stores.loginStore.login.role
       client
         .mutate({
           mutation: LIST,
           variables: { input: { page, limit, env, role } },
         })
         .then((response: any) => {
           stores.dataConversationStore.updateDataConversationList(response.data)
           resolve(response.data)
         })
         .catch((error) =>
           reject(new ServiceResponse<any>(0, error.message, undefined))
         )  
     })  
 
     addSegmentMapping = (variables: any) =>
     new Promise<any>((resolve, reject) => {  
       client
         .mutate({
           mutation: CREATE_RECORD,
           variables,
         })
         .then((response: any) => {
           resolve(response.data)
         })
         .catch((error) =>
           reject(new ServiceResponse<any>(0, error.message, undefined))
         )
     })
 
   checkExitsEnvCode = (variables: any) =>
     new Promise<any>((resolve, reject) => {
       client
         .mutate({
           mutation: CHECK_EXISTS_RECORD,
           variables,
         })
         .then((response: any) => {
           resolve(response.data)
         })
         .catch((error) =>
           reject(new ServiceResponse<any>(0, error.message, undefined))
         )
     })
 
     deleteSegmentMapping = (variables: any) =>
     new Promise<any>((resolve, reject) => {
       client
         .mutate({
           mutation: REMOVE_RECORD,
           variables,
         })
         .then((response: any) => {
           resolve(response.data)
         })
         .catch((error) =>
           reject(new ServiceResponse<any>(0, error.message, undefined))
         )
     })

     deletedepartment = (variables: any) =>
     new Promise<any>((resolve, reject) => {
       console.log({variables});
       
      //  client
      //    .mutate({
      //      mutation: REMOVE_RECORD,
      //      variables,
      //    })
      //    .then((response: any) => {
      //      resolve(response.data)
      //    })
      //    .catch((error) =>
      //      reject(new ServiceResponse<any>(0, error.message, undefined))
      //    )
     })
 
     updateSingleFiled = (variables: any) =>
     new Promise<any>((resolve, reject) => {
       client
         .mutate({
           mutation: UPDATE_RECORD,
           variables,
         })
         .then((response: any) => {
           resolve(response.data)
         })
         .catch((error) =>
           reject(new ServiceResponse<any>(0, error.message, undefined))
         )
     })
 }
 