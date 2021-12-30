import About from './About/About';
import Buy from './Buy/Buy';

function Start() {
    return (
        <>
            <div className="container">
                <div className="background_image_box"></div>
                <div className="bg-text">
                    <h1>Now buying a home is easy with us</h1>
                    <a href='#buy' >Get Start</a>
                </div>
            </div>
            <About />
            <Buy />
        </>
    )
}

export default Start;