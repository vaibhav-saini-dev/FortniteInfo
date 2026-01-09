import vbuck from '../assets/Images/vbuck.jpg'

export default function CardInfo({ backgroundIMG, image, title, text, displayRarity, itemType, priceDifference, price }) {
    return (
        <>
            <div className="card" style={{ backgroundImage: `url("${backgroundIMG}")` }}>
                <div className="card-image" style={{ backgroundImage: `url("${image}")` }}></div>
                <h2 className="cardTextColor">{title}</h2>

                <br />
                
                <p className="cardTextColor"><i>Description: {text}</i></p>
                <p className="cardTextColor">Rarity: {displayRarity}</p>
                <p className="cardTextColor">Type: {itemType}</p>

                {priceDifference > 0 &&
                    <div className="cardPriceText">
                        <br />
                        <img src={vbuck} alt="Vbuck Image." />
                        <br />
                        {price} ({priceDifference} off!)
                    </div>
                }

                {priceDifference <= 0 &&
                    <div className="cardPriceText">
                        <img src={vbuck} alt="Vbuck Image." />
                        <br />
                        {price}
                    </div>
                }
            </div>
        </>
    )
}