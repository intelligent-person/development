import React, { useState } from "react";
import { Button, Checkbox, Col, Input, Radio, Row } from "antd";
import Search from "antd/es/input/Search";
import { NavLink } from "react-router-dom";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "../../../../utils/i18n";
import { queryClient } from "../../../../hooks/queryClient";

const PostsFilter = ({
  postsCount,
  setInclude,
  setSort,
  setPage,
  setSearchValue,
}) => {
  const mainUser = queryClient.getQueryData(["Auth User"]);
  const { t } = useTranslation();
  const [radio, setRadio] = React.useState("newest");
  const onSearch = (value) => {
    setSearchValue(value);
    setPage(1);
  };
  const [isFilter, setIsFilter] = useState(false);
  const [isUnanswered, setIsUnanswered] = useState(false);
  const [isTags, setIsTags] = useState(false);
  const [tags, setTags] = useState("");
  const onChange = (e) => {
    setRadio(e.target.value);
  };
  const onNewest = () => {
    setSort("newest");
    setInclude({});
    setPage(1);
  };
  const onViews = () => {
    setSort("moreViews");
    setPage(1);
  };
  const onUnanswered = () => {
    setInclude({ unanswered: "true" });
    setPage(1);
  };

  const onFilter = () => {
    if (isFilter) setIsFilter(false);
    else setIsFilter(true);
  };
  const onSubmit = () => {
    setSort(radio);
    setIsFilter(false);
    isTags
      ? setInclude({
          unanswered: isUnanswered,
          tags: tags.split(" ").join(","),
        })
      : setInclude({ unanswered: isUnanswered });
    setPage(1);
  };

  return (
    <div>
      <Row style={{ marginBottom: 10 }} justify={"space-between"}>
        <Col>
          <h1>{t("FilterComponent.AllQuestions")}</h1>
        </Col>
        <Col flex={"auto"} style={{ padding: "10px 20px 0" }}>
          <Search
            placeholder={t("FilterComponent.Search")}
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col style={{ marginTop: 10 }}>
          {mainUser ? (
            <NavLink to={"/questions/ask"}>
              <Button type={"primary"}>
                {t("FilterComponent.AskQuestion")}
              </Button>
            </NavLink>
          ) : (
            <NavLink to={"/login"}>
              <Button type={"primary"}>
                {t("FilterComponent.AskQuestion")}
              </Button>
            </NavLink>
          )}
        </Col>
      </Row>
      <Row style={{ marginBottom: 20 }} justify={"space-between"}>
        <Col>
          <h2>
            {postsCount} {t("FilterComponent.QuestionsCount")}
          </h2>
        </Col>
        <Col>
          <Button
            type={"default"}
            style={{ borderRadius: 0 }}
            autoFocus
            onClick={onNewest}
          >
            {t("FilterComponent.Newest")}
          </Button>
          <Button
            type={"default"}
            style={{ borderRadius: 0 }}
            onClick={onViews}
          >
            {t("FilterComponent.Views")}
          </Button>
          <Button
            type={"default"}
            style={{ borderRadius: 0 }}
            onClick={onUnanswered}
          >
            {t("FilterComponent.Unanswered")}
          </Button>
          <Button
            type={"primary"}
            style={{ borderRadius: 0 }}
            onClick={onFilter}
          >
            <MenuUnfoldOutlined /> {t("FilterComponent.Filter")}
          </Button>
        </Col>
      </Row>

      {isFilter && (
        <div className={"filter"}>
          <div>
            <h3>{t("FilterComponent.SortedBy")}</h3>
            <Radio.Group onChange={onChange} value={radio}>
              <Radio
                value={"newest"}
                style={{ width: "100%", marginBottom: 10 }}
              >
                <h4>{t("FilterComponent.Newest")}</h4>
              </Radio>
              <Radio
                value={"moreViews"}
                style={{ width: "100%", marginBottom: 10 }}
              >
                <h4>{t("FilterComponent.MoreViews")}</h4>
              </Radio>
              <Radio
                value={"lessViews"}
                style={{ width: "100%", marginBottom: 10 }}
              >
                <h4>{t("FilterComponent.LessViews")}</h4>
              </Radio>
            </Radio.Group>
          </div>
          <div>
            <h3>{t("FilterComponent.FilterBy")}</h3>
            <Checkbox
              onChange={(e) => setIsUnanswered(e.target.checked)}
              style={{ width: "100%", marginBottom: 10 }}
            >
              {t("FilterComponent.Unanswered")}
            </Checkbox>
            <br />
            <Checkbox
              onChange={(e) => setIsTags(e.target.checked)}
              style={{ width: "100%", marginBottom: 10 }}
            >
              {t("FilterComponent.Tags")}:{" "}
            </Checkbox>
            <br />
            {isTags && (
              <Input
                onChange={(e) => setTags(e.target.value)}
                placeholder={"например, c++ javascript..."}
              />
            )}
            <div style={{ marginTop: 10, textAlign: "right" }}>
              <Button type={"primary"} onClick={onSubmit}>
                {t("FilterComponent.Submit")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PostsFilter);
