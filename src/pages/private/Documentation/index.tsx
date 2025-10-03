import { useState, useEffect } from "react";
// import { PrismicProvider } from '@prismicio/react'
// import { client } from '../../../lib/prismic'
// import { usePrismicDocumentsByType } from '@prismicio/react'
import _ from "lodash";
import * as prismic from "@prismicio/client"
import "./style.css";
// import { PrismicRichText, SliceZone } from '@prismicio/react'
// import { createClient } from '@prismicio/client'
// import { Client } from '@prismicio/client'


import Lucide from "@/components/Base/Lucide";
import { Slideover } from "@/components/Base/Headless";
// import { Menu, Popover } from "@/components/Base/Headless";
// import { FormCheck, FormInput, FormSelect } from "@/components/Base/Form";
// import FileIcon from "@/components/Base/FileIcon";
// // import TomSelect from "@/components/Base/TomSelect";
// import Tippy from "@/components/Base/Tippy";
// import files from "@/fakers/files";
// import users from "@/fakers/users";
// import Button from "@/components/Base/Button";

// Create a client
// const client:any = prismic.createClient("https://miniswimmerchile.cdn.prismic.io/api/v2")
// client.getRepository();
// client.queryLatestContent();


// const createPrismicClient = () => {
//   return prismic.createClient("https://miniswimmerchile.cdn.prismic.io/api/v2", {
//     // Desactivar caché del navegador
//     fetch: (url, options) => {
//       return fetch(url, {
//         ...options,
//         cache: 'no-store',
//         headers: {
//           ...options?.headers,
//           'Prismic-Ref': '', // Se actualizará con el masterRef más reciente
//         },
//       });
//     },
//   });
// };

const createPrismicClient = () => {
  return prismic.createClient("https://miniswimmerchile.cdn.prismic.io/api/v2", {
    // Usar un parámetro válido para evitar caché
    fetch: (url, options) => {
      const timestamp = Date.now();
      const separator = url.includes('?') ? '&' : '?';
      return fetch(`${url}${separator}t=${timestamp}`, options);
    }
  });
};



// Tipos para mejor type safety
type DocumentData = {
  // Ajusta estos tipos según tu modelo en Prismic
  id: string;
  // ... otros campos
};


function Card(props:any) {
  const {data, setHtml} = props;
  const doc:any= data?.data?.slices[0]?.primary;
  return(
    <>
      <div
      key={"DOCUMENTATION"}
      className="col-span-12 sm:col-span-6 xl:col-span-4 border-dashed border-slate-300/80 [&:nth-child(4n)]:border-r-0 px-5 py-5 [&:nth-last-child(-n+4)]:border-b-0 border-r border-b flex flex-col"
    >
    <a onClick={(e:any) => {
        e.preventDefault();
        setHtml({status:true, html:doc?.html})
      }}
      className="z-40 w-full h-full  cursor-pointer  ">
      
      <div className="overflow-hidden rounded-lg h-52 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-slate-700/90 before:to-slate-50/20">
      
        <img
          alt="Miniswimmer"
          className="rounded-md"
          src={doc?.image?.url}
        />
        <div className="absolute bottom-0 z-10 w-full text-white text-xs font-medium rounded-md bg-slate-700/45 border border-success/10 px-4 py-4">
 
          <div className="flex justify-between">
            <span className="-mt-px">Categoría:</span>
            <span className="-mt-px uppercase bg-green-400 rounded-lg px-3 py-1 text-slate-800 ">
            {doc?.type}
            </span>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex flex-col gap-3.5 mb-5 pb-5 mt-auto border-b border-dashed border-slate-300/70">
          <h3 className="text-xl font-medium py-2 min-h-32"><p className="min-h-32">{doc?.title[0]?.text}</p></h3>
          {/* <div className="flex items-center">
            <div className="text-slate-500">Categoria:</div>
            <div className="ml-auto">
              <div className="flex items-center text-xs font-medium rounded-md text-success bg-success/10 border border-success/10 px-4 py-px">
                <span className="-mt-px">
                {doc?.type}
                </span>
              </div>
            </div>
          </div> */}
          <div className="flex items-center">
            <div className="text-slate-500">Creado:</div>
            <div className="ml-auto">
              <div className="flex items-center">
                <div className="flex items-center">
                 {doc?.date}
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
      </div>
    {/* <pre>{JSON.stringify(doc, null, 2)}</pre> */}
    </>
  )
}

export const generateHtml = (text:string) => {
  try {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    );
  } catch (error) {
    console.log("--generateHtml--", error);
    return <></>;
  }
};

function Main() {
  // const [data, setData] = useState([]);
  const [data, setData] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [content, setContent] = useState("");
  const [htmlSlideover, setHtmlSlideover] = useState(false);

  function setHtml(payload:any){
    const {status, html} = payload;
    
    setHtmlSlideover(status)
    setContent(html)
    
  }

   const refreshContent = async () => {
    setIsLoading(true);
    try {
      const client = createPrismicClient();
      const blogPosts = await client.getByType("documentation", {
        orderings: {
          field: "document.first_publication_date",
          direction: "desc",
        },
        pageSize: 100,
      });
      setData(blogPosts.results);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el contenido');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const client = createPrismicClient();

        // Usar el método API de Prismic directamente
        const blogPosts = await client.getByType("documentation", {
          orderings: {
            field: "document.first_publication_date",
            direction: "desc",
          },
          pageSize: 100, // Ajusta según tus necesidades
        });

        setData(blogPosts.results);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el contenido');
        console.error('Error fetching Prismic content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);
  
  if (isLoading) {
    return <div>Cargando contenido...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  
  return (
    <>
    <Slideover
      size="xl"
      key="Slide-doc"
      open={htmlSlideover}
      onClose={() => {
        setHtmlSlideover(false);
      }}
    >
      <Slideover.Panel className="w-80 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
        <a
          href=""
          className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
          onClick={(e:any) => {
            e.preventDefault();
            setHtmlSlideover(false);
          }}
        >
          <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
        </a>
        <Slideover.Description className="p-0 px-6">
          <div id="htmlContainer">
            {content && generateHtml(content)}
          </div>
          {/* <pre>{JSON.stringify(dataNew, null, 2)}</pre> */}
          {/* <div className="grid grid-cols-12 gap-y-10 gap-x-6">
            <div className="col-span-12">
              <div className="grid grid-cols-12 gap-y-10 gap-x-6 mt-4">
                <div className="col-span-12">
                 {content}
                </div>
              </div>
            </div>
          </div> */}
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>

      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col justify-between md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Documentación Miniswimmer
          </div>
          <button 
        onClick={refreshContent}
        className="mb-4 px-4 py-2 bg-primary text-slate-200 hover:bg-purple-400 border border-slate-200 rounded-lg"
      >
        Actualizar
      </button>
        </div>
        <div className="mt-3.5">
          <div className="flex flex-col box ">
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            
            </div>
            <div className="overflow-hidden">
              <div className="grid grid-cols-12 px-5 -mx-5 border-dashed border-y">
               { Array.isArray(data) && data.map((item:any, i:number)=>{
                
                return(
                  <>
                  <Card data={item} key={`CARD-DOC-${i}`} setHtml={setHtml}/>
                  </>
                )
              })}
              </div>
           
          </div>
        </div>
      </div>
    </div>
    </div>
       
     {/* <pre>blogPosts= {JSON.stringify(data, null, 2 )}</pre> */}
    
     </>
  )
  }
  
export default Main;
