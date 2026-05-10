import {
  IonAvatar,
  IonButton,
  IonHeader,
  IonIcon,
  IonToolbar,
} from "@ionic/react";

import {
  lockClosedOutline,
  chevronDownOutline,
  peopleOutline,
  filterOutline,
  searchOutline,
  downloadOutline,
} from "ionicons/icons";

import { Dispatch, SetStateAction } from "react";
import { USERS } from "../data/dataTask";

export default function Navbar({
  search,
  setSearch,
  filter,
  setFilter,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  return (
    <IonHeader className="shadow-none border-b border-slate-200/50">
      <IonToolbar>
        <div className="flex flex-wrap items-center justify-between bg-white px-2 sm:px-4 py-2 gap-2 sm:gap-4">
          <div className="flex flex-wrap w-full sm:w-auto justify-between items-center gap-2 sm:gap-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-1 sm:gap-2 text-slate-700">
                <IonIcon
                  icon={lockClosedOutline}
                  className="text-xs sm:text-sm md:text-base"
                />
                <h1 className="!text-[14px] sm:!text-[16px] md:!text-[18px] lg:!text-[20px] font-bold leading-tight">
                  Adhivasindo
                </h1>

                <IonIcon
                  icon={chevronDownOutline}
                  className="text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center">
                {USERS.slice(0, 5).map((item, index) => (
                  <IonAvatar
                    key={index}
                    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-2 border-white overflow-hidden ${
                      index !== 0 ? "-ml-2" : ""
                    }`}
                  >
                    <img src={item.avatar} alt="avatar" />
                  </IonAvatar>
                ))}
                {USERS.length > 5 && (
                  <div className="-ml-2 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-blue-500 text-white text-[10px] sm:text-xs md:text-sm font-semibold">
                    +{USERS.length - 5}
                  </div>
                )}
              </div>
            </div>

            <IonButton
              fill="solid"
              className="text-[10px] sm:text-xs md:text-sm !px-0.5 !py-1 sm:px-3 sm:py-2"
              color="dark"
            >
              <IonIcon
                icon={peopleOutline}
                slot="start"
                className="text-xs sm:text-sm"
              />
              Invite
            </IonButton>
          </div>

          <div className="flex sm:flex-row sm:items-center gap-2 w-full lg:w-auto lg:ml-auto">
            <div className="flex items-center gap-1 sm:gap-2 border rounded bg-slate-100 px-2 h-[30px] sm:h-[38px] md:h-[42px] w-full sm:w-auto">
              <IonIcon
                icon={filterOutline}
                className="text-slate-500 text-xs sm:text-sm"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent outline-none !text-slate-700 text-[10px] sm:text-sm md:text-base w-full"
              >
                <option value="">All</option>
                <option value="feature">Feature</option>
                <option value="bug">Bug</option>
                <option value="issue">Issue</option>
                <option value="undefined">Undefined</option>
              </select>
            </div>

            <button className="flex items-center justify-center gap-1 md:gap-2 text-slate-700 font-medium text-[10px] sm:text-sm md:text-base px-2 py-1 rounded hover:bg-slate-100">
              <IonIcon icon={downloadOutline} className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">Export / Import</span>
            </button>

            <div className="flex items-center w-1/4 gap-1 sm:gap-2 bg-slate-100 px-2 py-1 rounded border w-full sm:flex-1 h-[30px] sm:h-[38px] md:h-[42px]">
              <IonIcon
                icon={searchOutline}
                className="text-slate-500 text-xs sm:text-sm md:text-base"
              />
              <input
                type="text"
                placeholder="Search Tasks"
                className="outline-none w-full !text-slate-700 placeholder:text-slate-400 text-[10px] sm:text-sm md:text-base"
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
}
