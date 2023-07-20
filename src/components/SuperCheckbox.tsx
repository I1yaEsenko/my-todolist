import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type SuperCheckboxType = {
   isDone: boolean
   callback: (checked: boolean) => void
}

export const SuperCheckbox = (props: SuperCheckboxType) => {
   const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
         props.callback(e.currentTarget.checked)
   }

   return (
     <div>
        <Checkbox
          checked={props.isDone}
          onChange={changeChecked}
        />
     </div>
   );
};

