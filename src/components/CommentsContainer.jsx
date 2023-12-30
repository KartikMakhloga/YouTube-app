import React from 'react'

const CommentData = [
  {
    name:"John Doe",
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.",
    replies:[]
  }
];
 

const CommentsContainer = () => {
  return (
    <div className='m-5 p-2'>
      <h1 className='text-2xl font-bold'>Comments</h1>

    </div>
  )
}

export default CommentsContainer