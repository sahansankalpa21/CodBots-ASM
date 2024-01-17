import { faBackward, faBackwardStep, faForward, faForwardStep, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Summary from "./components/Summary";
import Timeline from "./components/Timeline";
import { useEffect, useRef, useState } from "react";
import Gallery from "./components/Gallery";
import QA from "./components/QA";

export default function App() {

  const [selectedMenuItem, setSelectedMenuItem] = useState('Summary')
  const [selectedVideoType, setSelectedVideoType] = useState('Animated')
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const [loopSegment, setLoopSegment] = useState(false);
  const [videoLoopInterval, setVideoLoopInterval] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const [sectionDetails, setSectionDetails] = useState({})
  const [allSections, setAllSections] = useState({})
  const [selectedSection, setSelectedSection] = useState()

  const getAllSections = () => {

  }

  const menuNavigationClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const videoTypeClick = (videoType) => {
    setSelectedVideoType(videoType)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopLoop = () => {
    if (videoLoopInterval) {
      clearInterval(videoLoopInterval);
      setVideoLoopInterval(null);
    }
  };

  const loopVideo = (loop, end) => {
    console.log('Looping video...');
    playSegment(0, end, loop);
  };

  const playSegment = (start, end, loop) => {
    setIsSegment(true);
    stopLoop();

    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }

    videoRef.current.currentTime = start;

    let playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          let interval = setInterval(() => {
            if (videoRef.current.currentTime >= end) {
              videoRef.current.pause();
              if (loop) {
                loopVideo(loop, end);
              }
              clearInterval(interval);
            }
          }, 100);
          setVideoLoopInterval(interval);
        })
        .catch((error) => {
          console.error('Error starting playback:', error);
        });
    }
  };

  useEffect(() => {
    return () => {
      stopLoop();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSelectedMenuItem('Playlist');
      } else {
        setSelectedMenuItem('Summary')
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 ">

        <div className="col-span-2">

          <div>
            <video ref={videoRef} width="100%">
              <source src="/src/assets/videos/tail_asm.mp4" type="video/mp4" id="videoSource" />
              Your browser does not support the video.
            </video>
          </div>

          <div className="bg-white flex justify-between px-8 items-center py-2 sm:flex-row flex-col">

            <div>
              <button className={`${selectedVideoType == 'Real' ? 'bg-[#00aeff] z-10' : 'bg-[#d1d1d1] z-0'} relative w-32 px-6 py-1 rounded-xl text-white font-semibold sm:my-0 my-3`} onClick={() => videoTypeClick('Real')}>Real</button>
              <button className={`${selectedVideoType == 'Animated' ? 'bg-[#00aeff] z-10' : ' bg-[#d1d1d1] z-0'} relative ml-[-20px] w-32 px-6 py-1 rounded-xl text-white font-semibold sm:my-0 my-3`} onClick={() => videoTypeClick('Animated')}>Animated</button>
            </div>

            <div className="flex gap-4">
              <button>
                <FontAwesomeIcon icon={faBackwardStep} style={{ color: "#00aeff" }} size="lg" />
              </button>
              <button>
                <FontAwesomeIcon icon={faBackward} style={{ color: "#00aeff" }} size="lg" />
              </button>
              <button onClick={togglePlayPause}>
                <FontAwesomeIcon icon={faPlay} style={{ color: "#00aeff" }} size="lg" />
              </button>
              <button>
                <FontAwesomeIcon icon={faForward} style={{ color: "#00aeff" }} size="lg" />
              </button>
              <button>
                <FontAwesomeIcon icon={faForwardStep} style={{ color: "#00aeff" }} size="lg" />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:flex-col p-3" >
          <div className="overflow-y-auto  h-[300px] mb-4" >
            <Timeline />
          </div>

          <div className="flex flex-col gap-1 mt-auto mb-2">
            <button className="bg-[#00aeff] text-white font-semibold py-1 rounded-sm">PLAY CONTINUOUSLY</button>
          </div>
        </div>
      </div>


      <div className="p-8 mt-4">

        <h2 className="font-bold text-xl mb-8">
          T05 : Connect Part 005
        </h2>

        <div className="flex">
          <div
            className={`ml-[2px] md:hidden ${selectedMenuItem === 'Playlist' ? 'bg-[#8b8b8b]' : 'bg-[#c0c0c0]'
              } px-4 py-2 cursor-pointer text-white`}
            onClick={() => menuNavigationClick('Playlist')}
          >
            Playlist
          </div>
          <div
            className={`ml-[2px] ${selectedMenuItem === 'Summary' ? 'bg-[#8b8b8b]' : 'bg-[#c0c0c0]'
              } px-4 py-2 cursor-pointer  text-white`}
            onClick={() => menuNavigationClick('Summary')}
          >
            Summary
          </div>
          <div
            className={`ml-[2px] ${selectedMenuItem === 'Gallery' ? 'bg-[#8b8b8b]' : 'bg-[#c0c0c0]'
              } px-4 py-2 cursor-pointer text-white`}
            onClick={() => menuNavigationClick('Gallery')}
          >
            Gallery
          </div>
          <div
            className={`ml-[2px] ${selectedMenuItem === 'Q&A' ? 'bg-[#8b8b8b]' : 'bg-[#c0c0c0]'
              } px-4 py-2 cursor-pointer text-white`}
            onClick={() => menuNavigationClick('Q&A')}
          >
            Q&A
          </div>
        </div>

        <div>
          {selectedMenuItem === 'Playlist' ? <Timeline /> : null}
          {selectedMenuItem === 'Summary' ? <Summary /> : null}
          {selectedMenuItem === 'Gallery' ? <Gallery /> : null}
          {selectedMenuItem === 'Q&A' ? <QA /> : null}
        </div>
      </div>
    </div>
  )
}