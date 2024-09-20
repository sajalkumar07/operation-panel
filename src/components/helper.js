import { hatsOffEvents } from "../constants/eventsData";

//Method used to filter the hatsOff events data from the session data.
//For both student and teacher role.
export const formatHatsOffEvents = session_events => {
  if (session_events && session_events.length) {
    session_events.map(value => {
      if (
        value.hasOwnProperty("eventName") &&
        value["eventName"] === "HatsOff"
      ) {
        hatsOffEvents.map(val => {
          if (val["hatsOffType"] === value["eventData"]) {
            val["active"] = true;
          }
          return true;
        });
      }
      return true;
    });
  } else {
    hatsOffEvents.map(val => {
      val["active"] = false;
      return true;
    });
  }
  return hatsOffEvents;
};
