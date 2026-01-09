import React from 'react'
import CardInfo from './CardInfo'
import unknownIMG from '../assets/Images/unknownIMG.jpg'
import common_background from '../assets/Images/common_background.jpg'

const MemoizedCardInfo = React.memo(CardInfo);
export default function BundleDisplay({ shopEntries, rarityBackground }) {
    return (
        <>
            {shopEntries?.map((entry, index) => {
                if (entry?.bundle != null) {
                    const bundle = entry?.bundle;

                    const items = entry?.brItems ?? entry?.cars ?? entry?.items ?? [];
                    const first = items[0];

                    const rarity = first?.rarity?.value ?? first?.series?.value ?? "common";
                    const displayRarity =
                        first?.rarity?.displayValue ??
                        first?.series?.value ??
                        "N/A";

                    let priceDifference = 0;

                    if (entry?.regularPrice && entry?.finalPrice) {
                        priceDifference = entry.regularPrice - entry.finalPrice;
                    }

                    return (

                        <MemoizedCardInfo
                            key={entry?.offerId ?? entry?.id ?? index}
                            backgroundIMG={rarityBackground[rarity] || common_background}
                            image={bundle?.image ?? unknownIMG}
                            title={bundle?.name ?? 'Name: N/A'}
                            text={bundle?.info ?? 'N/A'}
                            displayRarity={displayRarity}
                            itemType={"Bundle"}
                            priceDifference={priceDifference}
                            price={entry?.finalPrice ?? 'Price: N/A'}
                        />

                    )
                }
            }
            )}
        </>
    )
}