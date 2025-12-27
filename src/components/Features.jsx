import { useRef, useState } from "react"
import { TiLocationArrow } from "react-icons/ti"


        const BentoTilt = ({ children, className='' }) => {

            const [transformStyle, setTransformStyle] = useState('')
            const itemRef = useRef(null)

            const handleMouseMove = (e) => {
                if (!itemRef.current) return;

                const { left, top, width, height } = itemRef.current.getBoundingClientRect();

                const relativeX = (e.clientX - left) / width
                const relativeY = (e.clientY - top) / height

                const tiltX = (relativeY - 0.5) * 6;
                const tiltY = (relativeX - 0.5) * -6;

                const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
                
                setTransformStyle(newTransform);
            }
            
            const handleMouseLeave = () => {
                setTransformStyle('perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
            }

            return(
                <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{transform: transformStyle}} >
                    {children}
                </div>
            )
        }


    const BentoCard = ({ src, title, description }) => {
        return (
            <div className="relative size-full">
                <video src={src} loop muted autoPlay className="absolute left-0 top-0 size-full object-cover object-center"/>
                    <div className="relative z-10 flex flex-col size-full justify-between p-5 text-blue-50">
                        <div className="">
                            <h1 className="bento-title special-font">{title}</h1>
                            {description && (
                                <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                            )}
                        </div>
                    </div>
            </div>
        )
    }

const Features = () => {
  return (
    <section className='bg-black pb-52'>
    <div className='container mx-auto px-3 md:px-10'>
        <div className="px-5 py-32">
            <p className='font-circular text-lg text-blue-50'>
                Into The MetaGame Layer
            </p>
    
        <p className='max-w-md font-circular text-lg text-blue-50 opacity-50'>Immerse YourSelf In a rich and ever-expanding Universe
            where a vibrant array of products converge into an interconnected
            overlay experience on your world.
        </p>
    </div>
            <div className="border border-white/20 relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] ">
            <BentoCard src='videos/feature-1.mp4' title={<>radie<b>n</b>t </>}
            description='A cross-platform metagame app, turning your activities across web2 and web3 games into a rewarding adventure.' />
            </div>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:grid-rows-2 md:h-[120vh]">
                    
                    <BentoTilt className="bento-tilt_1 md:row-span-2">
                        <BentoCard src='videos/feature-2.mp4' title={<>Zig<b>m</b>a</>} description='An Anime and gaming-ispired NFT Collection - the IP Primed for expension.'  />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1">
                        <BentoCard src='videos/feature-3.mp4' title={<>N<b>e</b>xus</>} description='A gamified social hub, adding a new dimention of play to social interaction for web3 communities.' />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1">
                        <BentoCard src='videos/feature-4.mp4' title={<>az<b>u</b>l</>} description='A cross-world Ai Agent - elevating your gameplay to be more fun and productive.' />
                    </BentoTilt>

                        <BentoTilt className="bento-tilt_2">
                            <div className="flex size-full flex-col justify-between bg-violet-300 p-5 ">
                                <h1 className="bento-title special-font max-w-64 text-black"><b>M</b>ore Co<b>m</b>ing S<b>oo</b>n!</h1>

                                <TiLocationArrow className="m-5 scale-[5] self-end" />
                            </div>
                        </BentoTilt>

                                <BentoTilt className="bento-tilt_2">
                                    <video src="videos/feature-5.mp4" loop muted autoPlay className="size-full object-cover object-center " />
                                </BentoTilt>
                </div>
    </div>
    </section>
  )
}

export default Features