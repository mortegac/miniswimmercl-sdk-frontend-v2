import React, { useState, useId } from "react";
import { Link } from "react-router-dom";
// import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
// import Button from "../../../../base-components/Button";
// import Lucide from "../../../../base-components/Lucide";

// import IconTypeOfdata from "../../../../components/Icondatas";

interface Location {
  id: string;
  name: string;
  typeOfLocation: string;  
  status: string;

}

interface Props {
  data: Location;
}

const typeOfName: any = {
  // eslint-disable-next-line no-useless-computed-key
  [""]: "",
  ["data_is_missing"]: "Falta Información",
  ["approved"]: "😎  - HOMOLOGADO -",
  // ["approved"]: "🤟🏼  Vehiculo Homolado",
  // ["approved"]: "👍  Vehiculo Homolado",
  // ["approved"]: "✅  Vehiculo Homolado",
  // ["approved"]: "🎉  Vehiculo Homolado",
  ["in_progress"]: "Vehiculo en revisión",
  ["pre_entered"]: "Preingresado",
};

const typeOfStepNumber: any = {
  // eslint-disable-next-line no-useless-computed-key
  [0]: 1,
  [1]: 1,
  [2]: 1,
  [3]: 2,
  [4]: 2,
  [5]: 3,
  [6]: 3,
  [7]: 4,
  [8]: 4,
  [9]: 5,
};
const typeOfStep: any = {
  // eslint-disable-next-line no-useless-computed-key
  [0]: "Información general - Parte 1",
  [1]: "Información general - Parte 1",
  [2]: "Información general - Parte 2",
  [3]: "Información de electromovilidad - Parte 1",
  [4]: "Información de electromovilidad - Parte 2",
  [5]: "Información de seguridad - Parte 1",
  [6]: "Información de seguridad - Parte 2",
  [7]: "Información de comercial - Parte 1",
  [8]: "Información de comercial - Parte 2",
  [9]: "Test con cargadores eléctricos",
  [10]: "En proceso de homologación",

};


const typeOfStyle: any = {
  // eslint-disable-next-line no-useless-computed-key
  [""]: "",
  ["data_is_missing"]: "bg-red-100 text-slate-400 font-light",
  ["approved"]: "bg-green-100 text-slate-400 font-light",
  ["in_progress"]: "bg-yellow-100 text-slate-400 font-light",
  ["pre_entered"]: "text-slate-400 font-light",
};
const typeOfdata: any = {
  // eslint-disable-next-line no-useless-computed-key
  [""]: "",
  ["truckmore3500"]: "Camión +3500 KG",
  ["truckless3500"]: "Camión -3500 KG",
  ["truck"]: "Camioneta",
  ["tractortruck"]: "Tracto Camión",
  ["taxibus"]: "Taxibus",
  ["suv"]: "SUV",
  ["sedancar"]: "Sedán",
  ["passengervan"]: "Van de Pasajeros",
  ["minibus"]: "MiniBus",
  ["cargovan"]: "Van de carga",
  ["cargoutility"]: "Utilitario de carga",
  ["bus"]: "Bus",
};

const dataCard: React.FC<Props> = ({ data }) => {
  const id = useId();
  const [buttonModalPreview, setButtonModalPreview] = useState(false);

  const isModalOpen = (newValue: boolean) => {
    setButtonModalPreview(newValue);
  };

  return (
    <>
      <Link
        to="/data-detail"
        state={{ id: data.id }}
        className="col-span-12 sm:col-span-6 xl:col-span-4 intro-y "
      >
        <div
          key={`${id}-${data.id}`}
          className=" min-w-96"
          // onClick={(event: React.MouseEvent) => {
          //   event.preventDefault();
          //   alert("hiu");
          //   // dispatch(getUsersAccess(user.id))
          //   // setButtonModalPreview(true);
          // }}
        >
          <div>
            <div
              className={`p-5 box h-64 hover:scale-210 hover:bg-slate-200 cursor-pointer`}
            >
              {/* <div className="flex items-center justify-between">
                <Button
                  // variant="soft-success"
                  rounded
                  className={`${
                    typeOfStyle[data?.status]
                  } w-full mb-2 mr-1 px-6`}
                >
                  {typeOfName[data?.status]}
                </Button>
              </div> */}

              <div className="flex flex-row border-1">
                <div className="flex flex-col items-center justify-center p-4 border-r-4">
                  {/* <IconTypeOfdata type={data?.typeOfdata || ""} /> */}
                  <svg width="90" height="81" viewBox="0 0 90 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M38.4497 60.582H44.9999V75.4772H38.4497V60.582Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M44.1632 61.4187H39.2864V74.6405H44.1632V61.4187ZM38.4497 60.582V75.4772H44.9999V60.582H38.4497Z" fill="#595959"/>
<path d="M45 60.582H51.5502V75.4772H45V60.582Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M50.7135 61.4187H45.8367V74.6405H50.7135V61.4187ZM45 60.582V75.4772H51.5502V60.582H45Z" fill="#595959"/>
<path d="M9.29378 67.3075C7.72672 67.3021 6.15424 66.7436 4.90168 65.6157L4.84746 65.5669C2.43452 63.4034 1.95193 59.8084 3.69792 57.081L9.29378 47.7383L15.1011 57.4876C15.6596 58.4962 15.9361 59.5969 15.9361 60.6977C15.9361 62.3569 15.3126 63.9945 14.1197 65.2524C12.8129 66.6243 11.056 67.3184 9.29378 67.3075Z" fill="#89C763"/>
<path d="M80.7061 67.3075C79.1391 67.3021 77.5666 66.7436 76.314 65.6157L76.2598 65.5669C73.8469 63.4034 73.3643 59.8084 75.1103 57.081L80.7061 47.7383L86.5135 57.4876C87.072 58.4962 87.3431 59.5969 87.3431 60.6977C87.3431 62.3569 86.7195 63.9945 85.5266 65.2524C84.2252 66.6243 82.4684 67.3184 80.7061 67.3075Z" fill="#89C763"/>
<path d="M28.4836 0H61.5165V5.76937H28.4836V0Z" fill="#BFCCD6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M60.6799 0.83665H29.3203V4.93272H60.6799V0.83665ZM28.4836 0V5.76937H61.5165V0H28.4836Z" fill="#595959"/>
<path d="M53.925 11.3984H60.5512V18.0245H53.925V11.3984Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M59.7145 12.2351H54.7617V17.1879H59.7145V12.2351ZM53.925 11.3984V18.0245H60.5512V11.3984H53.925Z" fill="#595959"/>
<path d="M41.687 11.3984H48.3131V18.0245H41.687V11.3984Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M47.4765 12.2351H42.5237V17.1879H47.4765V12.2351ZM41.687 11.3984V18.0245H48.3131V11.3984H41.687Z" fill="#595959"/>
<path d="M29.4487 11.3984H36.0748V18.0245H29.4487V11.3984Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.2382 12.2351H30.2854V17.1879H35.2382V12.2351ZM29.4487 11.3984V18.0245H36.0748V11.3984H29.4487Z" fill="#595959"/>
<path d="M29.4487 23.6367H36.0748V30.2628H29.4487V23.6367Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.2382 24.4734H30.2854V29.4262H35.2382V24.4734ZM29.4487 23.6367V30.2628H36.0748V23.6367H29.4487Z" fill="#595959"/>
<path d="M41.687 23.6367H48.3131V30.2628H41.687V23.6367Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M47.4765 24.4734H42.5237V29.4262H47.4765V24.4734ZM41.687 23.6367V30.2628H48.3131V23.6367H41.687Z" fill="#595959"/>
<path d="M53.925 23.6367H60.5512V30.2628H53.925V23.6367Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M59.7145 24.4734H54.7617V29.4262H59.7145V24.4734ZM53.925 23.6367V30.2628H60.5512V23.6367H53.925Z" fill="#595959"/>
<path d="M53.925 35.8711H60.5512V42.4972H53.925V35.8711Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M59.7145 36.7077H54.7617V41.6605H59.7145V36.7077ZM53.925 35.8711V42.4972H60.5512V35.8711H53.925Z" fill="#595959"/>
<path d="M90 75.4805V80.6859H0V75.4805H9.29389H21.9117H38.4498H45H51.5502H68.0883H80.7061H90Z" fill="#BFCCD6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M89.1634 79.8493V76.3171H0.83665V79.8493H89.1634ZM90 75.4805H0V80.6859H90V75.4805Z" fill="#595959"/>
<path d="M68.0883 5.78516V75.4785H51.5501V60.5833H44.9999H38.4498V75.4785H21.9116V5.78516H68.0883ZM60.5512 54.7326V48.1065H53.9251V54.7326H60.5512ZM60.5512 42.4944V35.8683H53.9251V42.4944H60.5512ZM60.5512 30.2616V23.6355H53.9251V30.2616H60.5512ZM60.5512 18.0234V11.3973H53.9251V18.0234H60.5512ZM48.313 54.7326V48.1065H41.6869V54.7326H48.313ZM48.313 42.4944V35.8683H41.6869V42.4944H48.313ZM48.313 30.2616V23.6355H41.6869V30.2616H48.313ZM48.313 18.0234V11.3973H41.6869V18.0234H48.313ZM36.0748 54.7326V48.1065H29.4487V54.7326H36.0748ZM36.0748 42.4944V35.8683H29.4487V42.4944H36.0748ZM36.0748 30.2616V23.6355H29.4487V30.2616H36.0748ZM36.0748 18.0234V11.3973H29.4487V18.0234H36.0748Z" fill="#D5E3EF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M38.4498 60.5833H51.5501V75.4785H68.0883V5.78516H21.9116V75.4785H38.4498V60.5833ZM37.6131 74.6418V59.7467H52.3868V74.6418H67.2516V6.62181H22.7483V74.6418H37.6131ZM61.3879 55.5693H53.0885V47.2699H61.3879V55.5693ZM61.3879 43.331H53.0885V35.0317H61.3879V43.331ZM61.3879 31.0982H53.0885V22.7989H61.3879V31.0982ZM61.3879 18.86H53.0885V10.5606H61.3879V18.86ZM49.1496 55.5693H40.8502V47.2699H49.1496V55.5693ZM49.1496 43.331H40.8502V35.0317H49.1496V43.331ZM49.1496 31.0982H40.8502V22.7989H49.1496V31.0982ZM49.1496 18.86H40.8502V10.5606H49.1496V18.86ZM36.9114 55.5693H28.612V47.2699H36.9114V55.5693ZM36.9114 43.331H28.612V35.0317H36.9114V43.331ZM36.9114 31.0982H28.612V22.7989H36.9114V31.0982ZM36.9114 18.86H28.612V10.5606H36.9114V18.86ZM60.5512 48.1065V54.7326H53.9251V48.1065H60.5512ZM60.5512 35.8683V42.4944H53.9251V35.8683H60.5512ZM60.5512 23.6355V30.2616H53.9251V23.6355H60.5512ZM60.5512 11.3973V18.0234H53.9251V11.3973H60.5512ZM48.313 48.1065V54.7326H41.6869V48.1065H48.313ZM48.313 35.8683V42.4944H41.6869V35.8683H48.313ZM48.313 23.6355V30.2616H41.6869V23.6355H48.313ZM48.313 11.3973V18.0234H41.6869V11.3973H48.313ZM36.0748 48.1065V54.7326H29.4487V48.1065H36.0748ZM36.0748 35.8683V42.4944H29.4487V35.8683H36.0748ZM36.0748 23.6355V30.2616H29.4487V23.6355H36.0748ZM36.0748 11.3973V18.0234H29.4487V11.3973H36.0748Z" fill="#595959"/>
<path d="M53.9253 48.1055H60.5514V54.7316H53.9253V48.1055Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M59.7147 48.9421H54.7619V53.8949H59.7147V48.9421ZM53.9253 48.1055V54.7316H60.5514V48.1055H53.9253Z" fill="#595959"/>
<path d="M41.687 48.1055H48.3131V54.7316H41.687V48.1055Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M47.4765 48.9421H42.5237V53.8949H47.4765V48.9421ZM41.687 48.1055V54.7316H48.3131V48.1055H41.687Z" fill="#595959"/>
<path d="M41.687 35.8672H48.3131V42.4933H41.687V35.8672Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M47.4765 36.7038H42.5237V41.6566H47.4765V36.7038ZM41.687 35.8672V42.4933H48.3131V35.8672H41.687Z" fill="#595959"/>
<path d="M29.4487 48.1055H36.0748V54.7316H29.4487V48.1055Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.2382 48.9421H30.2854V53.8949H35.2382V48.9421ZM29.4487 48.1055V54.7316H36.0748V48.1055H29.4487Z" fill="#595959"/>
<path d="M29.4487 35.8672H36.0748V42.4933H29.4487V35.8672Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.2382 36.7038H30.2854V41.6566H35.2382V36.7038ZM29.4487 35.8672V42.4933H36.0748V35.8672H29.4487Z" fill="#595959"/>
<path d="M80.7069 76.7898C79.9857 76.7898 79.4055 76.2042 79.4055 75.4884V63.3912C79.4055 62.67 79.9911 62.0898 80.7069 62.0898C81.4226 62.0898 82.0082 62.6755 82.0082 63.3912V75.4884C82.0082 76.2096 81.4281 76.7898 80.7069 76.7898Z" fill="#595959"/>
<path d="M80.7178 64.691C80.3382 64.691 79.9749 64.5229 79.7255 64.2356L77.5565 61.6871C77.0902 61.1394 77.1553 60.3206 77.7029 59.8543C78.2506 59.388 79.0694 59.4531 79.5357 60.0007L80.7123 61.378L81.8727 60.0007C82.3336 59.4531 83.1578 59.3826 83.7055 59.8435C84.2531 60.3044 84.3236 61.1286 83.8627 61.6762L81.7155 64.2247C81.466 64.5229 81.1027 64.691 80.7178 64.691Z" fill="#595959"/>
<path d="M80.7291 68.6281C78.7716 68.6281 76.9063 67.9124 75.4477 66.6002L75.3935 66.5513C73.9999 65.2988 73.089 63.5853 72.8396 61.7255C72.5901 59.871 73.0022 57.9895 74.0054 56.4116L79.5904 47.0797C79.8235 46.6893 80.2519 46.4453 80.7074 46.4453C81.1629 46.4453 81.5912 46.6893 81.8244 47.0797L87.6317 56.8291C87.6371 56.8399 87.648 56.8508 87.6534 56.8616C88.4776 58.3419 88.7975 60.0174 88.586 61.7038C88.3746 63.3901 87.6426 64.9247 86.4713 66.1555C85.0453 67.6575 83.1149 68.5305 81.0436 68.6118C80.9405 68.6227 80.8321 68.6281 80.7291 68.6281ZM80.702 50.2898L76.2285 57.7672C76.2231 57.778 76.2123 57.7888 76.2068 57.7997C74.797 60.0012 75.182 62.8696 77.1286 64.6156L77.1829 64.6644C79.341 66.6002 82.5889 66.47 84.5844 64.3716C86.1894 62.6852 86.5093 60.1855 85.3869 58.1521L80.702 50.2898Z" fill="#595959"/>
<path d="M9.29428 76.7898C8.57311 76.7898 7.99292 76.2042 7.99292 75.4884V63.3912C7.99292 62.67 8.57853 62.0898 9.29428 62.0898C10.01 62.0898 10.5956 62.6755 10.5956 63.3912V75.4884C10.5956 76.2096 10.0155 76.7898 9.29428 76.7898Z" fill="#595959"/>
<path d="M9.30516 64.691C8.92559 64.691 8.5623 64.5229 8.31287 64.2356L6.14393 61.6871C5.67761 61.1394 5.74268 60.3206 6.29033 59.8543C6.83799 59.388 7.65676 59.4531 8.12309 60.0007L9.29973 61.378L10.4601 60.0007C10.921 59.4531 11.7452 59.3826 12.2929 59.8435C12.8405 60.3044 12.911 61.1286 12.4501 61.6762L10.3029 64.2247C10.0534 64.5229 9.69014 64.691 9.30516 64.691Z" fill="#595959"/>
<path d="M9.31623 68.6281C7.35877 68.6281 5.49348 67.9124 4.03487 66.6002L3.98065 66.5513C2.58711 65.2988 1.67615 63.5853 1.42673 61.7255C1.1773 59.871 1.5894 57.9895 2.59253 56.4116L8.17754 47.0797C8.4107 46.6893 8.83364 46.4453 9.29454 46.4453C9.75544 46.4453 10.1784 46.6893 10.4115 47.0797L16.2189 56.8291C16.2243 56.8399 16.2297 56.8508 16.2406 56.8616C17.0648 58.3419 17.3847 60.0174 17.1732 61.7038C16.9617 63.3901 16.2297 64.9247 15.0585 66.1555C13.6324 67.6575 11.7021 68.5305 9.63073 68.6118C9.5277 68.6227 9.41926 68.6281 9.31623 68.6281ZM9.29454 50.2898L4.81569 57.7617C4.81027 57.7726 4.79942 57.7834 4.794 57.7943C3.38419 59.9957 3.76918 62.8642 5.7158 64.6102L5.77002 64.659C6.78942 65.5753 8.05825 66.0308 9.32165 66.0308C10.726 66.0308 12.1196 65.4723 13.1715 64.3661C14.7711 62.6798 15.0964 60.1801 13.974 58.1467L9.29454 50.2898Z" fill="#595959"/>
</svg>

                  <p className="mt-2 text-slate-500 font-light">
                    {/* {data?.typeOfdata || " "} */}
                    {typeOfdata[data?.typeOfLocation]}
                    
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-6">
                <h2 className="text-base font-medium intro-y sm:text-xl">
                {data.name}
                  </h2>
                
                  {/* <h2 className="text-base font-medium intro-y sm:text-xl">
                    {data?.idBrand || "-"}
                  </h2>
                  <span className="text-slate-500">
                    {data?.idModel || "-"}
                  </span> */}
                </div>
              </div>

              <div className="w-full border-t border-dashed border-slate-200/60 my-2"></div>

              <div className="flex items-end text-slate-500">
                <div className="flex items-end justify-center w-full">
                  <p className="text-green-500 flex flex-col items-center justify-center">
                    {/* <p className="text-slate-400 font-light">
                      Paso actual: {typeOfStepNumber[data?.currentStep]}
                    </p> */}
{/* 
                    <p className="text-primary font-light">
                      {typeOfStep[data?.currentStep || 1]}
                    </p> */}
                  </p>
                </div>
              </div>

              {/* <div className="w-full border-t border-solid border-slate-200/60 my-4"></div> */}

              <div className="flex items-center justify-between">
                <div className="flex items-center text-slate-500">
                  <></>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default dataCard;
