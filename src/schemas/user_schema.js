class userSchema {
    static addUser(){
        return {
            type : "object",
            properties: {
                name: {type: 'string'},
                age: {type: 'number'},
                image: {type: 'string'},
            },
            required : ['name']
        };
    }

    static editUser(){
        return {
            type : "object",
            properties: {
                _id: {type: 'string'},
                name: {type: 'string'},
                age: {type: 'number'},
            },
            required : ['_id', 'name']
        };
    }
}

export default userSchema;