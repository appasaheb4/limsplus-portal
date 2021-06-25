import React from 'react'

import '../../library/assets/css/setting.css';

// import * as Assets from '../../library/assets/images'
import * as Assets from "@lp/library/assets/backimg"

import colorList from './hexaColor';

import * as LibraryComponents from "@lp/library/components"
import { useState } from 'react';
import { useEffect } from 'react';


export const SettingAdjustment = ()=> {
    const [colorbg , setbgcolor] = useState<any>([colorList])
    useEffect(()=>{
        const currentbgcolor = localStorage.getItem('bgcolor')
        if(currentbgcolor){
            setbgcolor(currentbgcolor)
        }
    },[])

    const hanleClick = (data)=>{
        setbgcolor(data)
        localStorage.setItem('bgcolor',data)
        console.log(colorbg)
    }
    return (
        <>
             <hr/>
                <small className="d-block text-uppercase font-weight-bold text-muted mb-2 colors">
                  COLOR
                </small>
                <div className='sideBarColorOptions'>
                  <div className='row'>
                      <div className='col-sm-5'>
                          <h4>Side Bar</h4>
                      </div>
                      <div className='col-md-7 d-flex theme-options'>
                        {
                            colorList.map((data,index)=>{
                                return(
                                    <div key={index} className='theme' onClick={hanleClick} style={{backgroundColor:`${data}`}} />
                                )
                            })
                        }
                      </div>
                  </div>
                </div>
                <div className='sideBarColorOptions'>
                  <div className='row'>
                      <div className='col-sm-5'>
                          <h4>Shortcut Bar</h4>
                      </div>
                      <div className='col-md-7 d-flex theme-options'>
                      {
                            colorList.map((data,index)=>{
                                return(
                                    <div key={index} className='theme' style={{backgroundColor:`${data}`}} />
                                )
                            })
                        }
                      </div>
                  </div>
                </div>  

                <hr /> 

                <small className="d-block text-uppercase font-weight-bold text-muted mb-2 colors">
                  IMAGES
                </small>
                <div className='backImages d-flex justify-content-between'>
                    <h4>Background Images</h4>
                    <LibraryComponents.Atoms.Form.Toggle/>
                </div>
                    <h4 className='title'>Background Images</h4>
                <div className='d-flex justify-content-between'>
                    <img src={Assets.img1} alt="" width='120px' height='70px'/>
                    <img src={Assets.img2} alt="" width='120px' height='70px'/>
                </div>
               
        </>
    )
}
