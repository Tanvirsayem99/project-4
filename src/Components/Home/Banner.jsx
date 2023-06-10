import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
    return (
        <div>
            <Carousel className='text-center' >
            <div className='relative md:h-[80vh]'>
                <img className='brightness-50 ' src='https://media.istockphoto.com/id/639604868/photo/cricket-player-batsman-on-the-stadium.jpg?s=1024x1024&w=is&k=20&c=WnnbztS788HLxFr6aC3VC5XruwkcvOQR7Ir4bDZaL3g=' />
                <p className='absolute hidden md:inline md:top-40 md:left-36 md:w-3/4  text-white md:font-semibold md:text-2xl'>Cricket is a popular sport played between two teams of eleven players each. It is a bat-and-ball game that originated in England and has gained immense popularity around the world, particularly in countries like India, Australia, England, Pakistan, and South Africa.</p>
            </div>
            <div className='relative md:h-[80vh]'>
                <img className='brightness-50 ' src="https://media.istockphoto.com/id/640931466/photo/batsman-on-the-stadium-in-action.jpg?s=1024x1024&w=is&k=20&c=JCm-j45nU7cj17bzNlZPPv1iUuTNbGWw279Js4P6c4k=" />
                <p className='absolute hidden md:inline md:top-40 md:left-36 md:w-3/4  text-white md:font-semibold md:text-2xl'>The objective of cricket is simple: to score more runs than the opposing team while dismissing their batsmen. The game takes place on a large oval-shaped field, known as the cricket ground, which features a rectangular pitch at its center. The pitch is a specially prepared strip of grass where most of the action takes place.</p>
            </div>
            <div className='relative md:h-[80vh]'>
                <img className='brightness-50 ' src="https://media.istockphoto.com/id/182810173/photo/soccer-ball-on-lawn.jpg?s=1024x1024&w=is&k=20&c=ELwL79LlRhgON4yaS0_JSWqXFDtoaFmU_5HIrIHn0HU=" />
                <p className='absolute hidden md:inline md:top-40 md:left-36 md:w-3/4  text-white md:font-semibold md:text-2xl'>Football, also known as soccer in some parts of the world, is the most popular sport globally, with an estimated 4 billion fans. It is a team sport played between two teams of eleven players each, using a spherical ball on a rectangular field. Football is known for its fast-paced and exhilarating nature, combining athleticism, skill, and strategy.</p>
            </div>
            <div className='relative md:h-[80vh]'>
                <img className='brightness-50 ' src="https://media.istockphoto.com/id/1397817779/photo/goal-soccer-ball-hitting-the-goal-net-after-scoring.jpg?s=1024x1024&w=is&k=20&c=g-oYDj-v5Th3dM5IxHyB7ZJFe8n00ebDnjz3mkH_yM8=" />
                <p className='absolute hidden md:inline md:top-40 md:left-36 md:w-3/4  text-white md:font-semibold md:text-2xl'>The objective of football is simple: to score more goals than the opposing team. The game is played on a pitch, typically made of natural or artificial grass, with goalposts at each end. The teams aim to move the ball towards the opponent's goal using any part of their body except their arms and hands, primarily using their feet.</p>
            </div>
            
        </Carousel>
        </div>
    );
};

export default Banner;