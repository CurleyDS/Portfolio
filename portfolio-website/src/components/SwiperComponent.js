// import Swiper core and required modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slides({ data = [] }) {
    function projectLink(project_link) {
        if (project_link.includes("http://") || project_link.includes("https://")) {
            return project_link;
        } else {
            return window.location.href + project_link;
        }
    }

    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            className='h-full'
        >
            {data.map((item, index) => (
                <SwiperSlide key={index} className='flex flex-col justify-center'>
                    <div className='flex flex-col justify-center p-5'>
                        {item.img && (item.project_link ? (
                            <a href={projectLink(item.project_link)} target="_blank" rel="noopener noreferrer" title='Go to Project'>
                                <img src={item.img} alt={item.title} className='relative object-scale-down h-64 mx-auto p-5' />
                            </a>
                        ) : (
                            <img src={item.img} alt={item.title} className='relative object-scale-down h-64 mx-auto p-5' />
                        ))}
                        {item.title && <h3 className='absolute left-0 bottom-0 p-5'>{item.title}</h3>}
                        {item.github_link && <a href={item.github_link} target="_blank" rel="noopener noreferrer" title='Go to Github Project'>
                            <FontAwesomeIcon icon={faGithub} className='absolute right-0 bottom-0 p-5' size='2x' />
                        </a>}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
      );
};

export default Slides;
