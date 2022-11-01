module.exports = {
    post:{
        tags:['Auth CRUD operations'],
        summary: "Register",
        description: "Register",
        operationId: "Register",
        parameters:[],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                example:{ 
                  "name":"example",
                  "phone": 8411480325,
                  "email": "example@email.com",
                  "password": "password"
                }
              },
            },
          },
        },
        required:true,
        responses:{

            '200':{
                description: ""
            },
            '404':{
                description: ""
            },
            '500':{
                description: ""
            }
            
        }
    }
}