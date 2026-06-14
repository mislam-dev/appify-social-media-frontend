import { AppImage } from "@/components/ui/AppImage";
import { PlusIcon } from "@/modules/feed/components/icons";
import { DESKTOP_STORIES, MOBILE_STORIES } from "@/modules/feed/data/mock";
import Link from "next/link";

export function StoryCarousel() {
  return (
    <>
      <div className="_feed_inner_ppl_card _mar_b16">
        <div className="_feed_inner_story_arrow">
          <button type="button" className="_feed_inner_story_arrow_btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="8"
              fill="none"
              viewBox="0 0 9 8"
            >
              <path
                fill="#fff"
                d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z"
              />
            </svg>
          </button>
        </div>
        <div className="row">
          {DESKTOP_STORIES.map((story, i) => {
            const hideClass =
              i === 2 ? " _custom_mobile_none" : i === 3 ? " _custom_none" : "";
            return (
              <div
                key={story.id}
                className={`col-xl-3 col-lg-3 col-md-4 col-sm-4 col${hideClass}`}
              >
                {story.isOwn ? (
                  <div className="_feed_inner_profile_story _b_radious6">
                    <div className="_feed_inner_profile_story_image">
                      <AppImage
                        src={story.image}
                        alt={story.name}
                        width={160}
                        height={220}
                        className="_profile_story_img"
                      />
                      <div className="_feed_inner_story_txt">
                        <div className="_feed_inner_story_btn">
                          <button className="_feed_inner_story_btn_link flex justify-center items-center">
                            <PlusIcon />
                          </button>
                        </div>
                        <p className="_feed_inner_story_para">{story.name}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="_feed_inner_public_story _b_radious6">
                    <div className="_feed_inner_public_story_image">
                      <AppImage
                        src={story.image}
                        alt={story.name}
                        width={160}
                        height={220}
                        className="_public_story_img"
                      />
                      <div className="_feed_inner_pulic_story_txt">
                        <p className="_feed_inner_pulic_story_para">
                          {story.name}
                        </p>
                      </div>
                      <div className="_feed_inner_public_mini">
                        <AppImage
                          src="/assets/images/mini_pic.png"
                          alt=""
                          width={32}
                          height={32}
                          className="_public_mini_img"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="_feed_inner_ppl_card_mobile _mar_b16">
        <div className="_feed_inner_ppl_card_area">
          <ul className="_feed_inner_ppl_card_area_list">
            {MOBILE_STORIES.map((story) => (
              <li className="_feed_inner_ppl_card_area_item" key={story.id}>
                <Link href="#" className="_feed_inner_ppl_card_area_link">
                  {story.isOwn ? (
                    <div className="_feed_inner_ppl_card_area_story">
                      <AppImage
                        src={story.image}
                        alt={story.name}
                        width={64}
                        height={64}
                        className="_card_story_img"
                      />
                      <div className="_feed_inner_ppl_btn">
                        <button
                          className="_feed_inner_ppl_btn_link"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 12 12"
                          >
                            <path
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 2.5v7M2.5 6h7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={
                        story.state === "inactive"
                          ? "_feed_inner_ppl_card_area_story_inactive"
                          : "_feed_inner_ppl_card_area_story_active"
                      }
                    >
                      <AppImage
                        src={story.image}
                        alt={story.name}
                        width={64}
                        height={64}
                        className="_card_story_img1"
                      />
                    </div>
                  )}
                  <p
                    className={
                      story.isOwn
                        ? "_feed_inner_ppl_card_area_link_txt"
                        : "_feed_inner_ppl_card_area_txt"
                    }
                  >
                    {story.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
