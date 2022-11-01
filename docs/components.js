module.exports = {
    components:{
        schemas:{
            User:{
                type:'object',
                properties:{
                    _id: {
                        type: 'mongoose.Schema.ObjectId',
                        description: 'an id of a user',
                        example: '62483b3656fcd80117a3a132'
                    },
                    name: {
                        type: 'String',
                        description: 'name of a user',
                        example: 'user1',
                    },
                    phone: {
                        type: 'Number',
                        description: 'phone of a user',
                        example: '84555215359',
                    },
                    email: {
                        type: 'String',
                        description: 'email of a user',
                        example: 'example@email.com',
                    },
                    password: {
                        type: 'String',
                        description: 'password of a user',
                        example: 'password',
                    },
                    isAdmin: {
                        type: 'Boolean',
                        description: 'Rule of a user',
                        example: false,
                    },
                    following: {
                        type: 'Array',
                        description: 'Users who are following you',
                        example: '[]',
                    },
                    followers: {
                        type: 'Array',
                        description: 'Users who you are following',
                        example: '[]',
                    },
                    courses: {
                        type: 'Array',
                        description: 'Courses which you are joining',
                        example: '[]',
                    },
                },
            },
            Post:{
                type:'object',
                properties:{
                    _id: {
                        type: 'mongoose.Schema.ObjectId',
                        description: 'an id of a post',
                        example: '62483b3656fcd80117a3a132'
                    },
                    userId: {
                        type: 'mongoose.Schema.ObjectId',
                        description: 'an id of a user',
                        example: '62483b3656fcd80117a3a132'
                    },
                    title:{
                        type:'String',
                        description:"Post's title",
                        example:"Coding in JavaScript"
                    },
                    content:{
                        type:'String',
                        description:"Post's content",
                        example:"this is content..."
                    },
                    image:{
                        type:"String",
                        description:"Post's url of image",
                        example: "https://example.com/image.jpg"
                    },
                    comments:{
                        type:"Array",
                        description:"Post's comments",
                        example: []
                    },
                }
            },
            Comment:{
                type:'object',
                properties:{
                    _id: {
                        type: 'mongoose.Schema.ObjectId',
                        description: 'An id of a comment',
                        example: '62483b3656fcd80117a3a132'
                    },
                    userId:{
                        type: 'mongoose.Schema.ObjectId',
                        description: 'An id of a user',
                        example: '62483b3656fcd80117a3a132'
                    },
                    content:{
                        type: 'String',
                        description: "Comment's content",
                        example: 'This is a content of comment'
                    }
                }
            },
            Course:{
                type:'object',
                properties:{
                    _id: {
                        type: 'mongoose.Schema.ObjectId',
                        description: 'An id of a course',
                        example: '62483b3656fcd80117a3a132'
                    },
                    title:{
                        type: 'String',
                        description: "Course's title",
                        example: 'Course of Javascript'
                    },
                    content:{
                        type: 'String',
                        description: "Course's content",
                        example: 'This is a content of course'
                    },
                    url:{
                        type: 'String',
                        description: "Course's url",
                        example: 'https://example.com/course1'
                    },
                    image:{
                        type: 'String',
                        description: "Course's image",
                        example: 'https://example.com/image.jpg'
                    },
                    users:{
                        type: 'Array',
                        description: "Users who joided this course",
                        example: []
                    },
                }
            },
            Event:{
                type:'object',
                properties:{
                    _id: {
                        type: 'mongoose.Schema.ObjectId',
                        description: 'An id of a event',
                        example: '62483b3656fcd80117a3a132'
                    },
                    title:{
                        type: 'String',
                        description: "Event's title",
                        example: 'This is the event'
                    },
                    content:{
                        type: 'String',
                        description: "Event's content",
                        example: 'This is a content of event'
                    },
                    image:{
                        type: 'String',
                        description: "Event's image",
                        example: 'https://example.com/image.jpg'
                    },
                    timeStart:{
                        type: 'Date',
                        description: "Time start of a event",
                        example: "2022-01-29"
                    },
                    timeStop:{
                        type: 'Date',
                        description: "Time stop of a event",
                        example: "2022-01-31"
                    },
                }
            },
            Symbol:{
                type:'object',
                properties:{
                    _id: {
                        type: 'mongoose.Schema.ObjectId',
                        description: 'An id of a symbol',
                        example: '62483b3656fcd80117a3a132'
                    },
                    symbolCode:{
                        type: 'String',
                        description: "Symbol's code",
                        example: 'AAV'
                    },
                }
            },
        }
    }
}