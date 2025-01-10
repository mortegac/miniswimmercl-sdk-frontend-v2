import clsx from "clsx";
import _ from "lodash";



import Lucide from "@/components/Base/Lucide";
import { FormCheck } from "@/components/Base/Form";
import activities from "@/fakers/activities";
import users from "@/fakers/users";
import messages from "@/fakers/messages";
import events from "@/fakers/events";
import projectDetails from "@/fakers/project-details";
import Button from "@/components/Base/Button";








export function MessagesPage() {
  
  return <>
   <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
                <div className="col-span-12 xl:col-span-8">
                  <div className="flex flex-col gap-y-7">
                    <div className="flex flex-col p-5 box ">
                      <div className="pb-5 mb-5 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                        Mensajes envíados al apoderado
                      </div>
                      <div className="-my-3">
                        <div className="relative overflow-hidden before:content-[''] before:absolute before:w-px before:bg-slate-200/60 before:left-0 before:inset-y-0 before:dark:bg-darkmode-400 before:ml-[14px]">
                          {_.take(activities.fakeActivities(), 5).map(
                            (faker, fakerKey) => (
                              <div
                                className={clsx([
                                  "mb-3 last:mb-0 relative",
                                  "first:before:content-[''] first:before:h-1/2 first:before:w-5 first:before:bg-white first:before:absolute",
                                  "last:after:content-[''] last:after:h-1/2 last:after:w-5 last:after:bg-white last:after:absolute last:after:bottom-0",
                                ])}
                                key={fakerKey}
                              >
                                <div
                                  className={clsx([
                                    "px-4 py-3 ml-8",
                                    "before:content-[''] before:ml-1 before:absolute before:w-5 before:h-5 before:bg-slate-200 before:rounded-full before:inset-y-0 before:my-auto before:left-0 before:dark:bg-darkmode-300 before:z-10",
                                    "after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-slate-500 after:rounded-full after:inset-y-0 after:my-auto after:left-0 after:ml-[11px] after:dark:bg-darkmode-200 after:z-10",
                                  ])}
                                >
                                  <a
                                    href=""
                                    className="font-medium text-primary"
                                  >
                                    {faker.activity}
                                  </a>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-y-1.5 mt-1.5 leading-relaxed text-slate-500 text-[0.8rem]">
                                    {faker.activityDetails}
                                    <span
                                      className={clsx([
                                        "group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-1.5 py-px mr-auto sm:mr-0",
                                        "[&.primary]:text-primary [&.primary]:bg-primary/10 [&.primary]:border-primary/10",
                                        "[&.success]:text-success [&.success]:bg-success/10 [&.success]:border-success/10",
                                        "[&.warning]:text-warning [&.warning]:bg-warning/10 [&.warning]:border-warning/10",
                                        "[&.info]:text-info [&.info]:bg-info/10 [&.info]:border-info/10",
                                        [
                                          "primary",
                                          "success",
                                          "warning",
                                          "info",
                                        ][_.random(0, 3)],
                                      ])}
                                    >
                                      <span className="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"></span>
                                      <span className="-mt-px">
                                        {faker.statusBadge}
                                      </span>
                                    </span>
                                  </div>
                                 
                                
                                  <div className="mt-1.5 text-xs text-slate-500">
                                    {faker.date}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                   
                  
                  </div>
                </div>
                <div className="relative col-span-12 row-start-1 xl:col-start-9 xl:col-span-4">
                  <div className="sticky flex flex-col top-[6.2rem] gap-y-7">

                    <div className="flex flex-col p-5 box ">
                      <div className="pb-5 mb-5 font-medium border-b  border-slate-300/70 text-[0.94rem]">
                        Modificación sesión
                      </div>
                      <div className="flex flex-col gap-8">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  </>
}