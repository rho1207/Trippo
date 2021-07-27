import React, { FC, useState, useRef, useCallback } from "react";
import { TextField } from '@material-ui/core';
import * as sc from "./TimeSlot.styles";
import * as d from "../../app/destinations/destinationTypes";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Grid, Tooltip, Input, InputAdornment } from "@material-ui/core";
import moment from "moment";
import Suggestions from "./Suggestions";
import * as c from "../../colors/colors";
import { Activity } from 'types/models';
import { useEffect } from 'react';
import { debounce } from 'lodash';

interface Props {
  handleHideCostToggle: (cost: number | undefined) => void;
  activity: Activity;
  showEdit?: boolean;
  index: number;
  editActivity: (activity: Activity) => void;
  deleteActivity: (activity: Activity) => void;
}

const TimeSlot: FC<Props> = ({ handleHideCostToggle, activity, showEdit, editActivity, deleteActivity }) => {
  const { time, destination, comments, type, suggested } = activity;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCost, setShowCost] = useState(true);
  const [commentsString, setCommentsString] = useState(comments.join('\n'));
  const timeRef = useRef(null);
  const isMounted = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const edit = useCallback(debounce(editActivity, 400), []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const comments = commentsString.split('\n').filter(e => Boolean(e));

    edit({
      ...activity,
      comments,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsString]);

  const setTime = (e: any) => {
    const t = e.target.value.split(":");
    const time = moment(date).set({ hour: t[0], minute: t[1] }).toISOString();
    editActivity({
      ...activity,
      time,
    });
  }

  // TODO: Fix cost input
  // const editCost = (costString: string) => {
  //   const newCost = costString.slice(1);
  //   setCost(Number(newCost));
  // }

  const getButtons = () => {
    return showEdit ? (
      <sc.StyledIconButton onClick={() => deleteActivity(activity)}>
        <DeleteOutlineIcon />
      </sc.StyledIconButton>
    ) : (
      <button onClick={() => setShowSuggestions(!showSuggestions)}>
      {!showSuggestions ? (
        <i className="fas fa-chevron-down"></i>
      ) : (
        <i
          style={{ color: c.DARK_ORANGE }}
          className="fas fa-chevron-up"
        ></i>
      )}
    </button>
    )
  }
  const handleShowCostToggle = () => {
    !showCost
      ? handleHideCostToggle(activity.cost)
      : handleHideCostToggle(-Math.abs(activity.cost || 0));
    setShowCost(!showCost);
  };

  const renderHeaderContent = () => (
    <sc.HeaderGrid container item lg={11} md={11} sm={11} xs={11}>
      <sc.Destination>
        <Grid container item lg={1} md={1} sm={1} xs={1}>
          {d.renderIcon(type)}
        </Grid>
        <Grid container item lg={9} md={9} sm={10} xs={10}>
          {destination}
        </Grid>
        <Grid container item lg={2} md={2} sm={3} xs={3}>
          <sc.Cost {...costStyling}>
              <sc.StyledFormControl fullWidth>
                {activity.cost || showEdit ? (
                <Input
                  disabled={!showEdit}
                  value={activity.cost}
                  onChange={() => alert("TODO")}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                ) : null}
            </sc.StyledFormControl>
            {activity.cost && !showEdit ? (
              <Tooltip
                title={`${showCost ? "Hide from" : "Include in"
                  } the total daily cost`}
              >
                <button onClick={handleShowCostToggle}>
                  {showCost ? (
                    <i className="fas fa-eye"></i>
                  ) : (
                    <i className="far fa-eye-slash"></i>
                  )}
                </button>
              </Tooltip>
            ) : null}
          </sc.Cost>
        </Grid>
      </sc.Destination>
    </sc.HeaderGrid>
  );
  const costStyling = !showCost ? { style: { color: "#24272b85" } } : {};
  const date = time ? new Date(time) : new Date();

  return (
    <sc.Slot showSuggestions={showSuggestions} borderColor={d.getIconColor(type)}>
      <Grid container item lg={12}>
        <Grid container item lg={3} md={3} sm={12}>
          <sc.Time>
            <TextField
              disabled={!showEdit}
              onChange={(e) => setTime(e)}
              ref={timeRef}
              id="time"
              type="time"
              defaultValue={moment(date, "dd DD-MMM-YYYY, hh:mm").format("HH:mm")}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </sc.Time>
        </Grid>
        <sc.SlotGrid container item lg={9} md={9} sm={12} xs={12}>
          {renderHeaderContent()}
          <Grid container item lg={1} md={1} sm={1} xs={1}>
            <sc.CommentButton>
              {getButtons()}
            </sc.CommentButton>
          </Grid>
          <Grid container item lg={12} md={12} sm={12} xs={12}>
            <sc.Comments>
              <sc.StyledTextField
                fullWidth
                id="filled-textarea"
                label="Comments"
                disabled={!showEdit}
                multiline
                variant="outlined"
                value={commentsString}
                onChange={(e: any) => setCommentsString(e.currentTarget.value)}
              />
            </sc.Comments>
          </Grid>
        </sc.SlotGrid>
        {showSuggestions ? (
          <Suggestions
            renderIcon={d.renderIcon}
            suggested={suggested}
          ></Suggestions>
        ) : null}
      </Grid>
    </sc.Slot>
  );
};

export default TimeSlot;
