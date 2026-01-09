import React from "react";
import CardInfo from "./CardInfo";
import unknownIMG from "../assets/Images/unknownIMG.jpg";
import common_background from "../assets/Images/common_background.jpg";

const MemoizedCardInfo = React.memo(CardInfo);

function getPriceDifference(entry) {
  const regular = entry?.regularPrice;
  const final = entry?.finalPrice;
  return typeof regular === "number" && typeof final === "number" ? regular - final : 0;
}

export default function ItemDisplay({ shopEntries, rarityBackground }) {
  return (
    <>
      {shopEntries?.flatMap((entry, entryIndex) => {
        if (entry?.bundle != null) return []; // bundles handled elsewhere

        const priceDifference = getPriceDifference(entry);
        const offerKey = entry?.offerId ?? entry?.id ?? `entry-${entryIndex}`;

        // 1) BR items (normal cosmetics)
        if (Array.isArray(entry?.brItems) && entry.brItems.length) {
          return entry.brItems.map((item, itemIndex) => (
            <MemoizedCardInfo
              key={`${offerKey}:${item?.id ?? itemIndex}`}
              backgroundIMG={
                rarityBackground?.[item?.rarity?.value ?? "common"] ?? common_background
              }
              image={
                item?.images?.icon ??
                item?.images?.featured ??
                item?.images?.smallIcon ??
                item?.images?.lego ??
                unknownIMG
              }
              title={item?.name ?? "Name: N/A"}
              text={item?.description ?? "Description: N/A"}
              displayRarity={item?.rarity?.displayValue ?? item?.series?.value ?? "N/A"}
              itemType={item?.type?.displayValue ?? item?.type?.value ?? "N/A"}
              priceDifference={priceDifference}
              price={entry?.finalPrice ?? "Price: N/A"}
            />
          ));
        }

        // 2) Jam tracks
        if (Array.isArray(entry?.tracks) && entry.tracks.length) {
          return entry.tracks.map((t, tIndex) => (
            <MemoizedCardInfo
              key={`${offerKey}:track:${t?.id ?? tIndex}`}
              backgroundIMG={rarityBackground?.["icon"] ?? common_background}
              image={t?.albumArt ?? unknownIMG}
              title={t?.title ?? "Name: N/A"}
              text={t?.artist ? `${t.artist}${t.releaseYear ? ` (${t.releaseYear})` : ""}` : ""}
              displayRarity={"Jam Track"}
              itemType={"Jam Track"}
              priceDifference={priceDifference}
              price={entry?.finalPrice ?? "Price: N/A"}
            />
          ));
        }

        // 3) Instruments
        if (Array.isArray(entry?.instruments) && entry.instruments.length) {
          return entry.instruments.map((i, iIndex) => (
            <MemoizedCardInfo
              key={`${offerKey}:instr:${i?.id ?? iIndex}`}
              backgroundIMG={rarityBackground?.[i?.rarity?.value ?? "common"] ?? common_background}
              image={i?.images?.large ?? i?.images?.small ?? unknownIMG}
              title={i?.name ?? "Name: N/A"}
              text={i?.description ?? ""}
              displayRarity={i?.rarity?.displayValue ?? "Instrument"}
              itemType={i?.type?.displayValue ?? i?.type?.value ?? "N/A"}
              priceDifference={priceDifference}
              price={entry?.finalPrice ?? "Price: N/A"}
            />
          ));
        }

        return [];
      })}
    </>
  );
}
