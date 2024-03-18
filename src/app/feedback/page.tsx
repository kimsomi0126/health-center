'use client';
import HeaderComponent from '@/components/common/HeaderComponent';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import { IoShareSocialSharp } from 'react-icons/io5';
import { IoMdInformationCircle } from 'react-icons/io';
import { useFirebase } from '@/hooks/useFirebase';
import { useColletion } from '@/hooks/useColletion';
import { MdEditDocument } from 'react-icons/md';

// 등록하기 기능
type FeedBack = {
  id: number;
  message: string;
  email: string;
  name: string;
};
// 기본 FeedBack 데이터 활용 및 edit 추가
type FeeBackWidthEdit = {
  edit: boolean; // 편집/읽기
  [key: string]: any;
};

const Feedback = (): JSX.Element => {
  // FB Hook 가져오기
  const { documents, error } = useColletion('feedback');
  // feedback Collection 만들기
  const { rerponse, addDocument, deleteDocument, editDocument } =
    useFirebase('feedback');
  // 입력창 관련 state
  const [message, setMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // 피드백 목록 관련 state
  const [feedbackList, setFeedBackList] = useState<FeeBackWidthEdit[]>([]);

  // 목록 내용 등록
  const addFeedback = () => {
    const feedback: FeedBack = {
      id: Date.now(),
      message: message,
      name: name,
      email: email,
    };
    addDocument(feedback);

    // 실시간 등록된 목록 업데이트 하기
    // onSnapShot
    // setFeedBackList([...feedbackList, feedback]);
  };

  // 문서 삭제하기
  const deleteFeedback = (_id: string) => {
    deleteDocument(_id);
  };

  // Reduce 의 State 를 참조해서 결과를 처리한다.
  useEffect(() => {
    if (rerponse.success) {
      setMessage('');
      setEmail('');
      setName('');
    }
  }, [rerponse.success]);

  // 수정 모드를 위한 처리
  // 편집 변경 목록 업데이트
  useEffect(() => {
    const list: FeeBackWidthEdit[] = [];
    documents?.forEach(item => {
      // 추가적인 속성을 추가(edit)
      const tempFeedback: FeeBackWidthEdit = { ...item, edit: false };
      list.push(tempFeedback);
    });
    setFeedBackList(list);
  }, [documents]);

  // 내용 수정 관련
  const [editMessage, setEditMessage] = useState<string>('');

  const editChangeMode = (_id: string, _isEdit: boolean) => {
    const arr: FeeBackWidthEdit[] = feedbackList.map(item => {
      if (item.id === _id) {
        // 기존 message 출력 처리
        setEditMessage(item.message);
        return { ...item, edit: _isEdit };
      } else {
        // 한개만 수정되도록 state 관리
        return { ...item, edit: false };
      }
    });
    setFeedBackList(arr);
  };

  // 새로운 내용으로 업데이트 하기
  const editSave = (_id: string) => {
    // id 를 이용한 업데이트
    // 화면용 state 인 edit 속성은 불필요하므로 원본에서 찾아요
    const editData = documents?.find(item => item.id === _id);
    const updateData = { ...editData, message: editMessage };
    editDocument(_id, updateData);
  };

  return (
    <>
      <HeaderComponent
        rightElements={[
          <Link href="/about" key="about" className={styles.box}>
            <IoMdInformationCircle />
            서비스소개
          </Link>,
          <button
            key="share"
            className={styles.box}
            onClick={() => {
              alert('공유');
            }}
          >
            <IoShareSocialSharp />
            공유
          </button>,
        ]}
      />
      <main>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                대한 민국 보건소 위치 지도 서비스 피드백
              </h1>
              <p className="text-xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                본 서비스에 대한 피드백을 남겨주세요.
              </p>
            </div>
            {/* 피드백 입력 */}
            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 mx-auto">
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      Feedback Input
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <section className="text-gray-600 body-font relative">
                      <div className="container px-5 mx-auto">
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                          <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                              <div className="relative">
                                <label
                                  htmlFor="name"
                                  className="leading-7 text-xl text-gray-600"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="w-full text-xl bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                  value={name}
                                  required
                                  onChange={e => {
                                    setName(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="p-2 w-1/2">
                              <div className="relative">
                                <label
                                  htmlFor="email"
                                  className="leading-7 text-xl text-gray-600"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className="w-full text-xl bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                  value={email}
                                  required
                                  onChange={e => {
                                    setEmail(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="p-2 w-full">
                              <div className="relative">
                                <label
                                  htmlFor="message"
                                  className="leading-7 text-xl text-gray-600"
                                >
                                  Message
                                </label>
                                <textarea
                                  id="message"
                                  name="message"
                                  className="w-full text-xl bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                  value={message}
                                  required
                                  onChange={e => {
                                    setMessage(e.target.value);
                                  }}
                                ></textarea>
                              </div>
                            </div>
                            <div className="p-2 w-full">
                              <button
                                onClick={() => {
                                  addFeedback();
                                }}
                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
            {/* 피드백 리스트 */}
            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 py-24 mx-auto">
                <div className="-my-8 divide-y-2 divide-gray-100">
                  {/* =============== 등록된 목록 출력 영역 */}
                  {feedbackList?.map(item => {
                    const date = item.createdTime.toDate(); // 가정: createdTime이 Firebase Timestamp 객체
                    const dateString = date.toDateString(); // 또는 다른 포매팅 방법 사용
                    return (
                      <div
                        key={item.id}
                        className="py-8 flex flex-wrap md:flex-nowrap"
                      >
                        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                          <span className="font-semibold title-font text-gray-700">
                            {item.name}
                          </span>
                          <span className="mt-1 text-gray-500 text-lg">
                            {item.email} <br />
                            {dateString}
                          </span>
                        </div>
                        <div className="md:flex-grow">
                          {/* <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                            {item.nickName}
                          </h2> */}

                          {/* 수정 또는 읽기 상태 */}
                          {item.edit ? (
                            <div className="border-b-2 pb-5">
                              <textarea
                                id="editmessage"
                                name="editmessage"
                                value={editMessage}
                                onChange={e => {
                                  setEditMessage(e.target.value);
                                }}
                                className="w-full text-lg bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                              ></textarea>
                              <div className="flex gap-5">
                                <button
                                  onClick={() => {
                                    // 새로운 내용으로 저장
                                    editSave(item.id);
                                  }}
                                  className="ml-4 text-orange-500 inline-flex items-center mt-4"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    // 수정모드 취소
                                    editChangeMode(item.id, false);
                                  }}
                                  className="ml-4 text-gray-500 inline-flex items-center mt-4"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <p className="leading-relaxed">{item.message}</p>
                              <button
                                onClick={() => {
                                  // 수정모드 실행
                                  editChangeMode(item.id, true);
                                }}
                                className="text-indigo-500 inline-flex items-center mt-4"
                              >
                                Edit
                              </button>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              deleteFeedback(item.id);
                            }}
                            className="text-indigo-500 inline-flex items-center mt-4"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* ============= 등록된 목록 출력 영역 */}
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default Feedback;
