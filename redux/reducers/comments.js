// Immutability : Object.assign(), concat(), filter(), map() always return "brand new object"

import {ADD_COMMENT, REMOVE_COMMENT, EDIT_COMMENT, THUMB_UP_COMMENT, THUMB_DOWN_COMMENT} from '../actions';

function comments(state = [], action) {

    switch (action.type) {

        case ADD_COMMENT:

            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    votes: 0
                }
            ]


        case REMOVE_COMMENT:

            return state.filter(comment => comment.id !== action.id)


        case EDIT_COMMENT:
            
            return (
                state.map(comment => {

                    if (comment.id === action.id) {

                        return Object.assign({}, comment, {text: action.text})
                    }

                    return comment
                }) 
            )

        // above, what we return from reducer is the whole comments 'state' after map(), 'return comment' is just return from map(). 
        // We map() the state so we're not mutating it.

        case THUMB_UP_COMMENT:

            return (
                state.map(comment => {

                    if (comment.id === action.id) {
                        
                        return { ...comment, votes: comment.votes +1 }
                        // alternative to Object.assign, must install "babel-plugin-transform-object-rest-spread"
                    }
                
                    return comment;
                })
            )

        case THUMB_DOWN_COMMENT:
        
            return (
                state.map(comment => {

                    if (comment.id === action.id) {

                        return {...comment, votes: comment.votes -1 }
                    }

                    return comment
                })
            )
            

        default:

            return state
    }   
}
