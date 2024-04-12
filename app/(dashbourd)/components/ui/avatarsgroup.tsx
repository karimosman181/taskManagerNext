"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const avatars = [
    {
        avatar : "https://mynaui.com/avatars/avatar-01.jpg",
    },{
        avatar : "https://mynaui.com/avatars/avatar-02.jpg",
    },{
        avatar : "https://mynaui.com/avatars/avatar-03.jpg",
    },{
        avatar : "https://mynaui.com/avatars/avatar-04.jpg",
    },{
        avatar : "https://mynaui.com/avatars/avatar-05.jpg",
    },
]

export default function AvatarsGroup() {
    const [ avatarsTotal, setAvatarsTotal ] = useState(0);
    useEffect(()=> { setAvatarsTotal(avatars.slice(3).length)},[]);
  return (
    <>
    <div className="flex -space-x-3 *:ring *:ring-white">
        { avatars.slice(0,3).map((avatar: any, index) => {         
            return (<Avatar key={index}>
                <AvatarImage src={avatar.avatar} />
            </Avatar>);
        })}
        {
            avatarsTotal > 0 ? <><Avatar >
                <AvatarFallback className='bg-blue-500 text-white'> { "+" + avatarsTotal}</AvatarFallback>
            </Avatar></> : ''
        }
    </div>
    </>
  );
}