module.exports = {
    post:{
        tags:['Auth CRUD operations'],
        summary: "Login",
        description: "Login",
        operationId: "Login",
        parameters:[],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                example:{ 
                  email: "example@email.com",
                  password: "password"
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