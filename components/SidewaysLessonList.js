import { string, bool, array } from "prop-types";
import LessonCard from "../components/LessonCard";
import React, { Fragment } from "react";
import Link from "next/link";

class SidewaysLessonList extends React.Component {
  static propTypes = {
    lessons: array
  };

  render() {
    const props = this.props;
    return (
      <div className="relative sideways-container">
        <section className="absolute card-container pa-1 md:p-8 lg:p-10 xl:p-10">
          {props.lessons.map(lesson => (
            <div className="lesson-card" key={lesson.uid}>
              <LessonCard
                document={lesson}
              />
            </div>
          ))}
        </section>
        <style jsx>{`
          .sideways-container {
            min-height: 40rem;
            overflow-x: scroll;
            overflow-y: hidden;
            width: 100%;
            -webkit-overflow-scrolling: touch;
          }
          .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, 16rem);
            grid-gap: 2rem;
            width: ${(props.lessons.length + 1) * 20}rem;
            margin: auto;
          }
        `}</style>
      </div>
    );
  }
}

export default SidewaysLessonList;
