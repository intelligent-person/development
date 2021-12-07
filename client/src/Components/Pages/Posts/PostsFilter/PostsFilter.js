import React, { useState } from "react";
import { Button, Checkbox, Col, Input, Radio, Row } from "antd";
import Search from "antd/es/input/Search";
import { NavLink, useHistory } from "react-router-dom";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "../../../../utils/i18n";
import { useAuth0 } from "@auth0/auth0-react";
import qs from "query-string";

const PostsFilter = ({ postsCount }) => {
  const { isAuthenticated } = useAuth0();
  const { t } = useTranslation();
  const history = useHistory();
  const queryParams = qs.parse(window.location.search);

  const [radio, setRadio] = React.useState("newest");
  const [isFilter, setIsFilter] = useState(false);
  const [isUnanswered, setIsUnanswered] = useState(false);
  const [isTags, setIsTags] = useState(false);
  const [tags, setTags] = useState("");
  const onSearch = (value) => {
    const newQueries = {
      ...queryParams,
      search: value ? value.replaceAll("+", "%2B") : undefined,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };
  const onChange = (e) => {
    setRadio(e.target.value);
  };
  const onNewest = () => {
    const newQueries = {
      ...queryParams,
      sort: "newest",
      unanswered: false,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };
  const onViews = () => {
    const newQueries = {
      ...queryParams,
      sort: "moreViews",
      unanswered: false,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };
  const onUnanswered = () => {
    const newQueries = {
      ...queryParams,
      unanswered: true,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };

  const onFilter = () => {
    if (isFilter) setIsFilter(false);
    else setIsFilter(true);
  };
  const onSubmit = () => {
    const newQueries = {
      ...queryParams,
      unanswered: isUnanswered,
      tags: isTags
        ? tags.split(" ").join(",").replaceAll("+", "%2B")
        : undefined,
      sort: radio,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
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
          {isAuthenticated ? (
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
