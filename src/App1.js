import React from "react";
import {
  ReactiveBase,
  DataSearch,
  NumberBox,
  DateRange,
  RangeSlider
} from "@appbaseio/reactivesearch";
import {ReactiveMap} from "@appbaseio/reactivemaps";
import "./App1.css";

export default () => (
  <div className="main-container">
    <ReactiveBase
      app="housing"
      credentials="0aL1X5Vts:1ee67be1-9195-4f4b-bd4f-a91cd1b5e4b5"
      type="listing"
      theme={{
        colors: {
          primaryColor: "#41ABF5"
        }
      }}
    >
      <div className="nav-container">
        <nav className="nav">
          <div className="title">Airbeds</div>
        </nav>
      </div>
      <div className="filters-search-container">
        <div className="filter-container">
          <DateRange
            dataField="date_from"
            componentId="DateRangeSensor"
            title="When"
            numberOfMonths={2}
            queryFormat="basic_date"
            initialMonth={new Date("04/01/2017")}
            className="dateFilter"
          />
          <NumberBox
            componentId="GuestSensor"
            dataField="accommodates"
            title="Guests"
            defaultSelected={2}
            labelPosition="right"
            data={{
              start: 1,
              end: 16
            }}
            className="numberFilter"
          />
          <RangeSlider
            componentId="PriceSensor"
            dataField="price"
            title="Price Range"
            range={{
              start: 10,
              end: 250
            }}
            rangeLabels={{
              start: "$10",
              end: "$250"
            }}
            defaultSelected={{
              start: 10,
              end: 50
            }}
            stepValue={10}
            interval={20}
            react={{
              and: ["DateRangeSensor", "GuestSensor"]
            }}
            className="rangeFilter"
          />
        </div>
        <div className="search-container">
          <DataSearch
            componentId="search"
            dataField="name"
            autosuggest={false}
            placeholder="Search housings..."
            iconPosition="left"
            className="search"
          />
        </div>
      </div>

      <div className="result-map-container">
        <ReactiveMap
          componentId="map"
          dataField="location"
          defaultZoom={13}
          pagination
          onPageChange={() => {
            window.scrollTo(0, 0);
          }}
          style={{
            width: "calc(100% - 280px)",
            height: "calc(100vh - 52px)"
          }}
          className="rightCol"
          showMarkerClusters={false}
          showSearchAsMove={false}
          onAllData={(
            hits,
            streamHits,
            loadMore,
            renderMap,
            renderPagination
          ) => (
            <div style={{display: "flex"}}>
              <div className="card-container">
                {hits.map(data => (
                  <div key={data._id} className="card">
                    <div
                      className="card__image"
                      style={{backgroundImage: `url(${data.image})`}}
                      alt={data.name}
                    />
                    <div>
                      <h2>{data.name}</h2>
                      <div className="card__price">${data.price}</div>
                      <p className="card__info">
                        {data.room_type} · {data.accommodates} guests
                      </p>
                    </div>
                  </div>
                ))}
                {renderPagination()}
              </div>
              <div className="map-container">{renderMap()}</div>
            </div>
          )}
          onData={data => ({
            label: (
              <span style={{width: 40, display: "block", textAlign: "center"}}>
                ${data.price}
              </span>
            )
          })}
          react={{
            and: ["GuestSensor", "PriceSensor", "DateRangeSensor", "search"]
          }}
        />
      </div>
    </ReactiveBase>
  </div>
);
