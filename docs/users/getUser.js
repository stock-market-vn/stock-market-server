module.exports = {
    get:{
        tags:['User CRUD operations'],
        description: "Get a user",
        operationId: "getUser",
        parameters:[
            {
                name: "_id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/User/properties/_id"
                },
                // required:true,
                description: "A single user id"
            },
            {
                in: "header",
                name: "token",
                type: "String",
                required:true,
                description: "token",
                schema:{
                  example:"Bearer token"
                },
            }
        ],
        responses:{
            '200':{
                description:"Todo is obtained",
                content:{
                    'application/json':{
                        schema:{
                            example:{
                                _id: "",
                                name: "user1",
                                phone: "",
                                email: "",
                                following: "",
                                followers: "",
                                courses: "",
                            }
                        }
                    }
                }
            },
            '404':{
                description: "Todo is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the todo",
                                internal_code:"Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}