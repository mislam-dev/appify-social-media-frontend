import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { OnlineDot, SearchIcon } from "@/modules/feed/components/icons";
import { FRIENDS, RECOMMENDED } from "@/modules/feed/data/mock";

export function RightSidebar() {
  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="_layout_right_sidebar_wrap">

        <div className="_layout_right_sidebar_inner">
          <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_right_inner_area_info_content _mar_b24">
              <h4 className="_right_inner_area_info_content_title _title5">
                You Might Like
              </h4>
              <span className="_right_inner_area_info_content_txt">
                <Link className="_right_inner_area_info_content_txt_link" href="#">
                  See All
                </Link>
              </span>
            </div>
            <hr className="_underline" />
            {RECOMMENDED.map((person) => (
              <div className="_right_inner_area_info_ppl" key={person.id}>
                <div className="_right_inner_area_info_box">
                  <div className="_right_inner_area_info_box_image">
                    <Link href="#">
                      <AppImage
                        src={person.avatar}
                        alt={person.name}
                        width={48}
                        height={48}
                        className="_ppl_img"
                      />
                    </Link>
                  </div>
                  <div className="_right_inner_area_info_box_txt">
                    <Link href="#">
                      <h4 className="_right_inner_area_info_box_title">
                        {person.name}
                      </h4>
                    </Link>
                    <p className="_right_inner_area_info_box_para">
                      {person.role}
                    </p>
                  </div>
                </div>
                <div className="_right_info_btn_grp">
                  <button type="button" className="_right_info_btn_link">
                    Ignore
                  </button>
                  <button
                    type="button"
                    className="_right_info_btn_link _right_info_btn_link_active"
                  >
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="_layout_right_sidebar_inner">
          <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_feed_top_fixed">
              <div className="_feed_right_inner_area_card_content _mar_b24">
                <h4 className="_feed_right_inner_area_card_content_title _title5">
                  Your Friends
                </h4>
                <span className="_feed_right_inner_area_card_content_txt">
                  <Link className="_feed_right_inner_area_card_content_txt_link" href="#">
                    See All
                  </Link>
                </span>
              </div>
              <form
                className="_feed_right_inner_area_card_form"
                onSubmit={(e) => e.preventDefault()}
              >
                <SearchIcon className="_feed_right_inner_area_card_form_svg" />
                <input
                  className="form-control me-2 _feed_right_inner_area_card_form_inpt"
                  type="search"
                  placeholder="input search text"
                  aria-label="Search"
                />
              </form>
            </div>
            <div className="_feed_bottom_fixed">
              {FRIENDS.map((friend) => (
                <div
                  key={friend.id}
                  className={`_feed_right_inner_area_card_ppl${
                    friend.online ? "" : " _feed_right_inner_area_card_ppl_inactive"
                  }`}
                >
                  <div className="_feed_right_inner_area_card_ppl_box">
                    <div className="_feed_right_inner_area_card_ppl_image">
                      <Link href="#">
                        <AppImage
                          src={friend.avatar}
                          alt={friend.name}
                          width={48}
                          height={48}
                          className="_box_ppl_img"
                        />
                      </Link>
                    </div>
                    <div className="_feed_right_inner_area_card_ppl_txt">
                      <Link href="#">
                        <h4 className="_feed_right_inner_area_card_ppl_title">
                          {friend.name}
                        </h4>
                      </Link>
                      <p className="_feed_right_inner_area_card_ppl_para">
                        {friend.role}
                      </p>
                    </div>
                  </div>
                  <div className="_feed_right_inner_area_card_ppl_side">
                    {friend.online ? <OnlineDot /> : <span>{friend.lastSeen}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
