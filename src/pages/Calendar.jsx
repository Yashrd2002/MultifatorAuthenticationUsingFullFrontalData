import React from 'react';
import {ScheduleComponent,Day, Week, WorkWeek,Month,Agenda,Inject
,Resize,DragAndDrop} from '@syncfusion/ej2-react-schedule';
import {scheduleData} from '../data/dummy';
import {Header, Navbar, Sidebar, ThemeSettings} from '../components';
import { useStateContext } from '../context/ContextProvider';
import SideBar from '../components/Sidebar';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';

const Calendar = () => {
  const {currentColor,activeMenu, themeSettings, setThemeSettings, currentMode} = useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
    <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
      <TooltipComponent content="Settings" position="Top">
        <button
          type="button"
          className="text-3xl p-3 hover:drop-shadow-xl
                     hover:bg-light-gray text-white"
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor, borderRadius: "50%" }}
        >
          <FiSettings />
        </button>
      </TooltipComponent>
    </div>
    {activeMenu ? (
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
        <SideBar />
      </div>
    ) : (
      <div className="w-0 dark:bg-secondary-dark-bg">
        <Sidebar />
      </div>
    )}
    <div
      className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
        activeMenu ? " md:ml-72" : "flex-2"
      }`}
    >
      <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
        <Navbar />
      </div>

      {themeSettings && <ThemeSettings />}
      {/*  */}
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="App" title="Calendar"/>
      <ScheduleComponent height="650px" eventSettings={{dataSource: scheduleData}} selectedDate={new Date(2021,0,10)}>
        <Inject services={[Day,Week,WorkWeek,Month,Agenda,Resize,DragAndDrop]}/>
      </ScheduleComponent>
    </div>
    {/*  */}
    </div>
    </div>
  )
}

export default Calendar