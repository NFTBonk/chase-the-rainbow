import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Navigation, Autoplay, Pagination, FreeMode } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { mq, defaultContainerMargins } from '../../utils/styles';
import PurpleHat from '../../images/purplehat.png';
import BlackHat from '../../images/blackhat.png';
import WorkShirt from '../../images/workshirt.png';
import SpaceTee from '../../images/spacetee.png';

import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/free-mode/free-mode.min.css'


const RadialButton = styled.button`
  appearance: button;
  background-color: #a1c4fc;
  background-image: none;
  border: 1px solid #000;
  border-radius: 50px;
  box-shadow: transparent 4px 4px 0 0,#000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  display: inline-block;
  font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  img {
    vertical-align: middle;
    margin-left: 6%;
    max-width: 20px;
  }
`

const CollabMerchContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  img {
    width: 90%;
  }
`

const CollabMerch = styled.img`

`

const CommunityContainer = styled.div`
    ${defaultContainerMargins}
    text-align: center;
  /* @media (max-width: 625px) {
    text-align: left;
    h1 {
      margin-left: 10%;
    }
    button {
      margin-left: 10%;
    }
  }
  @media (max-width: 625px) {
    h1 {
      margin-left: 20px;
      margin-right: 20px;
    }
    button {
      margin-left: 20px;
      margin-right: 20px;
    }
  } */
`

const Community = () => (
  (
    <CommunityContainer>
        <h1>MERCHANDISE</h1>
        <a id='os' href={'https://shop.noodles.app/collections/all-products'} target='_blank' rel='noreferrer'>
          <RadialButton>SHOP ALL MERCH <LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/Vectorarrow.png'} alt='arrow'/></RadialButton>
        </a>
        <h1 style={{fontSize:'22px',color: 'white'}}>Intergalactic Exploration Team Merchandise</h1>
        <CollabMerchContainer>
        <a href='https://shop.noodles.app/products/noodles-x-doodles-intergalactic-exploration-team-work-shirts' target="_blank" rel="noreferrer"><LazyLoadImage src={ WorkShirt } alt='workshirt' effect='blur'/></a>

        <a href='https://shop.noodles.app/products/noodles-x-doodles-intergalactic-space-exploration-team-trucker-hat?variant=42793017606301' target="_blank" rel="noreferrer"><LazyLoadImage src={ BlackHat} alt='blackhat' effect='blur'/></a>

        <a href='https://shop.noodles.app/products/noodles-x-doodles-intergalactic-space-exploration-team-trucker-hat?variant=42793017639069' target="_blank" rel="noreferrer"><LazyLoadImage src={ PurpleHat} alt='purplehat' effect='blur'/></a>

        <a href='https://shop.noodles.app/products/noodles-x-doodles-space-tee' target="_blank" rel="noreferrer"><LazyLoadImage src={ SpaceTee } alt='spacetee' effect='blur'/></a>
      </CollabMerchContainer>
      <>
      <h1 style={{fontSize:'22px', color: 'white'}}>Noodles Merchandise</h1>
      <Swiper
        dir="rtl"
        slidesPerView={3}
        spaceBetween={20}
        slidesPerGroup={1}
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: true,
        }}
        breakpoints={{
          755: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          955: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1565: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1900: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        loopFillGroupWithBlank={true}
        modules={[Autoplay, Pagination, FreeMode]}
        speed={2000}
        className="merch-swiper"
      >
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/space-noodles-trucker-hat' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/hat.webp'} alt='hat' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-tee?variant=42288979837085' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/out_of_this_world_white_front.webp'} alt='tee' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-tee?variant=42288979837085' target="_blank" rel="noreferrer"><LazyLoadImage  src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/out_of_this_world_white_back.webp'} alt='tee' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-tee?variant=42288979804317' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/ootw_tee_front_black.webp'} alt='tee' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-tee?variant=42288979804317' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/ootw_tee_black_flatlay.webp'} alt='tee' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-hoodie?variant=42288993829021' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/ootw_hoodie_seafoam_back.webp'} alt='hoodie' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-hoodie?variant=42288993829021' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/ootw_hoodie_seafoam_front.webp'}  alt='hoodie' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-hoodie?variant=42288993861789' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/ootw_hoodie_natural_front.webp'}  alt='hoodie' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-hoodie?variant=42288993861789' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/ootw_hoodie_natural_back.webp'}  alt='hoodie' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/out-of-this-world-shorts' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/space_shorts.webp'} alt='hat' effect='shorts'/></a></SwiperSlide>


        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/doodle-noodle-tee' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/doodlenoodle.webp'} alt='tee' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-world-hoodie' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/hoodieback.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-world-hoodie' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/hoodiefront.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-pants-tee-white' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/pantsback.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-pants-tee-white' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/pantsfront.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/custom-noodle-print-frame?variant=41977984385181' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/frame1.webp'} alt='frame' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/send-noods-tee?variant=41978442350749' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/sendnoodswhiteback.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/send-noods-tee?variant=41978442350749' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/sendnoodswhitefront.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodles-sticker-pack' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/stickerpack.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-world-tee?variant=41978407125149' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/worldblackback.webp'}alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-world-tee?variant=41978407125149' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/worldblackfront.webp'}alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/custom-noodle-print-frame?variant=41977984352413' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/frame2.webp'} alt='frame' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/airbrush-tee-light-blue' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/airbrushtee.webp'} alt='tee' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-world-tee?variant=41978406928541' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/worldcreamback.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-world-tee?variant=41978406928541' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/worldcreamfront.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/custom-noodle-print-frame?variant=41977984319645' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/frame3.webp'} alt='frame' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/send-noods-tee' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/noodsblackback.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/send-noods-tee' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/noodsblackfront.webp'} alt='art' effect='blur'/></a></SwiperSlide>
        <SwiperSlide className='merch-slide'><a href='https://shop.noodles.app/products/noodle-pin-box' target="_blank" rel="noreferrer"><LazyLoadImage src={'https://noodleswebsite.s3.us-west-1.amazonaws.com/images/pinbox.webp'} alt='pinbox' effect='blur'/></a></SwiperSlide>
      </Swiper>
    </>
    </CommunityContainer>
  )
);

export default Community;