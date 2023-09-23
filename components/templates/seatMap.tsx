import Seat from "@/components/templates/seat";
import seatMap from "@/configs/seatMap";
import useIsHeaderGlobal from "@/globalstates/isHeader";
import useIsFooterGlobal from "@/globalstates/isFooter";
import useIsCardGlobal from "@/globalstates/isCard";
import Image from "next/image";

export default function SeatMap() {
  const [isHeader, setIsHeader] = useIsHeaderGlobal();
  const [isFooter, setIsFooter] = useIsFooterGlobal();
  const [isCard, setIsCard] = useIsCardGlobal();

  return (
    <section
      id="map"
      className="h-full w-full"
      onClick={() => {
        if (isHeader) setIsHeader(false);
        if (isFooter) setIsFooter(false);
        if (isCard) setIsCard(false);
      }}
    >
      {seatMap.map((seat, index) => {
        switch (seat.type) {
          case "seat":
            return (
              <Seat key={index} id={seat.id} area={seat.area}>
                {seat.id.toLocaleUpperCase()}
              </Seat>
            );
          case "object":
            return (
              <Image
                key={index}
                width={30}
                height={30}
                className={seat.area + " !w-full !h-full"}
                src={seat.objectUrl}
                alt=""
              />
            );
          case "text":
            return (
              <Seat key={index} id={seat.id} area={seat.area}>
                {seat.body}
              </Seat>
            );
        }
      })}
    </section>
  );
}