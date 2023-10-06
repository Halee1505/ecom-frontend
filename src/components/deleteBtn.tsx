import { Category } from "@/model/category";
import { useEffect, useRef, useState } from "react";

const DeleteButton = ({
  propsText,
  denyText,
  confirmText,
  onConfirm,
}: {
  propsText: string;
  denyText: string;
  confirmText: string;
  onConfirm: () => void;
}) => {
  const [show, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Click occurred outside the div
        setShow(false);
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="delete-btn" ref={divRef}>
      <div className={`delete-btn-modal ${show && "active"}`}>
        {propsText}
        <div>
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            {denyText}
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          version="1.1"
          id="Layer_1"
          width="800px"
          height="800px"
          viewBox="0 0 70 70"
          enableBackground="new 0 0 70 70"
          xmlSpace="preserve"
        >
          <g>
            <g>
              <path d="M18.041,14.021c1.013,0,2.021,0.385,2.79,1.153l14.196,14.142l14.142-14.142c0.77-0.769,1.778-1.152,2.791-1.152    c1.024,0,2.053,0.394,2.839,1.18c1.563,1.562,1.574,4.082,0.027,5.63L40.685,34.973l14.142,14.196    c1.547,1.547,1.535,4.068-0.026,5.631c-0.785,0.785-1.813,1.178-2.839,1.178c-1.013,0-2.022-0.383-2.792-1.152L35.027,40.63    L20.831,54.825c-0.769,0.77-1.778,1.154-2.791,1.154c-1.024,0-2.054-0.395-2.839-1.18c-1.563-1.563-1.574-4.084-0.027-5.631    l14.197-14.196L15.174,20.831c-1.547-1.547-1.533-4.068,0.027-5.63C15.987,14.415,17.016,14.021,18.041,14.021 M18.041,10.021    L18.041,10.021c-2.138,0-4.151,0.835-5.667,2.351c-3.12,3.121-3.132,8.185-0.028,11.287l11.363,11.319L12.346,46.339    c-3.105,3.107-3.092,8.172,0.028,11.289c1.514,1.516,3.526,2.352,5.666,2.352c2.126,0,4.121-0.826,5.62-2.326l11.362-11.361    l11.313,11.355c1.505,1.504,3.5,2.33,5.626,2.33c2.138,0,4.15-0.834,5.666-2.35c3.12-3.121,3.132-8.184,0.027-11.287    L46.336,34.978L57.654,23.66c3.104-3.106,3.092-8.17-0.028-11.287c-1.514-1.516-3.526-2.351-5.666-2.351    c-2.124,0-4.119,0.825-5.618,2.323l-11.32,11.319L23.654,12.34C22.162,10.847,20.166,10.022,18.041,10.021L18.041,10.021z" />
            </g>
            <g>
              <path d="M50.7,21.714c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l2.121-2.121    c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-2.121,2.121C51.212,21.617,50.956,21.714,50.7,21.714z" />
            </g>
            <g>
              <path d="M40.801,31.614c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l7.07-7.07    c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-7.07,7.07C41.313,31.516,41.057,31.614,40.801,31.614z" />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default DeleteButton;
