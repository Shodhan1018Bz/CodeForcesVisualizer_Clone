import React from 'react';
import "./tables.css";

export default function Table(props:any){
    return(
            <div className='tables d-flex flex-column b shadow-lg rounded'>
            <div className=' bg-secondary text-white  d-flex justify-content-between p-1 '>
                <div><p className='h6'>{props.H1} </p></div>
                <div><p className='h6'>{props.handle} </p></div>
            </div>
            <hr className='m-0'></hr>
            <div className=' bg-light d-flex justify-content-between p-1  '>
                <div className=''><p >{props.r2l}</p></div>
                <div><p>{props.r2r}</p></div>
            </div>
            <hr className='m-0'></hr>
            <div className=' bg-light d-flex justify-content-between p-1  '>
                <div className=''><p >{props.r3l}</p></div>
                <div><p>{props.r3r}</p></div>
            </div>
            <hr className='m-0'></hr>
            <div className=' bg-light d-flex justify-content-between p-1  '>
                <div className=''><p >{props.r4l}</p></div>
                <div><p>{props.r4r}</p></div>
            </div>
            <hr className='m-0'></hr>
            <div className=' bg-light d-flex justify-content-between p-1  '>
                <div className=''><p >{props.r5l}</p></div>
                <div><p>{props.r5r}</p></div>
            </div>
            <hr className='m-0'></hr>
            <div className=' bg-light d-flex justify-content-between p-1  '>
                <div className=''><p >{props.r6l}</p></div>
                <div><p>{props.r6r}</p></div>
            </div>
            <hr className='m-0'></hr>
            <div className=' bg-light d-flex justify-content-between p-1  '>
                <div className=''><p >{props.r7l}</p></div>
                <div><p>{props.r7r}</p></div>
            </div>
            </div>
    )
}