import { useGlobalContext } from '../context/GlobalContext';

import CellPhoneList from '../components/CellPhoneList';

import '../styles/Home.css';

function Home() {

    return (
        <>
            <div className="jumbotron">
                <h2 className="jumbo-title">I TELEFONI CHE HANNO FATTO LA STORIA</h2>

                <video
                    autoPlay
                    muted
                    loop
                    className="jumbo-video"
                >
                    <source src="/nostalgic_dialing.webm" type="video/webm" />
                    Il tuo browser non supporta il video.
                </video>
            </div>


            <CellPhoneList />
        </>
    );
}

export default Home;
