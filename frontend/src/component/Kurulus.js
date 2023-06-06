import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function Kurulus({kurulus}) {
  return (
    <div>
        <div className ='card nmb-10'>
            <div className ='card-body'>
                <div className = 'card-img-actions'>
                    <img src = {kurulus.kurulus_logo}width="280" height="280"/>

                </div>
            </div>
            <div className='card-body bg-light text-center'>
                 <div className='mb-2'>
                      <h6>
                        <a href = {`kuruluslar/${kurulus._id}`} className = "kurulus-title">{kurulus.kurulus_adi}</a>
                        
                        </h6>
                        <span className='kurulus-category'> {kurulus.kurulus_turu}</span><br></br>
                        <span className='kurulus-category'>Konum: {kurulus.ulke}</span><br></br>
                        <span className='kurulus-category'>Web site: {kurulus.web_site}</span><br></br>
                        <span className='kurulus-category'>Çalışan sayısı: {kurulus.calisan_sayisi}</span><br></br>


                
        </div>


</div>
<LinkContainer to = {`kuruluslar/${kurulus._id}`} >
<Button onClick={() => alert('Takip listesine eklendi!')}>Takip et<i className="fa fa-solid fa-magnifying-glass"></i></Button>

</LinkContainer>
</div>

    </div>
  )
}

export default Kurulus