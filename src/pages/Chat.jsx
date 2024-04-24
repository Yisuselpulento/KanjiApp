import React from 'react'

const Chat = () => {
  return (
    <div className='bg-gradient-to-r from-red-800 to-black  py-2 rounded relative'>
      <div className='fixed flex items-center gap-7 ml-6'>
        <p className='text-3xl font-serif text-pink-500 bg-black'>Chat aun no terminado</p>
        <img src='vomit.webp' className='h-[150px]  ' />

      </div>

      <video autoPlay controls={false} volume={0} loop disablePictureInPicture disableRemotePlayback width='500'>
        <source src='/sayorideath.mp4' type='video/mp4' />

      </video>
      <div className='flex gap-4'>
        <img src='satan.gif' className='w-[200px] h-[400px] p-5 ' />
        <p className='p-4 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est veritatis harum ullam doloremque incidunt vitae consectetur mollitia! Nihil excepturi quos odit rem iste unde consequatur, expedita, iusto eum reiciendis nulla?
          Repudiandae, sint! Iusto voluptatibus, explicabo ducimus quas molestiae ea eius officia natus est ut sint minus doloribus hic obcaec
        </p>
      </div>
      <p className='font-yeseva p-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem eius at nisi quaerat corrupti? Itaque similique quo adipisci. Consequuntur optio id et eaque odit, officiis totam libero repellendus ad quibusdam.
        Officiis, eaque quis? Odio, commodi doloremque, modi quos recusandae sint adipisci maiores corporis molestias illo possimus distinctio. Quam excepturi temporibus, laudantium minus similique odio vero praesentium nisi non, nulla dolorum?
        Commodi mollitia natus incidunt cumque repellendus dolorum eaque a facilis aspernatur ut itaque nemo adipisci nam veniam aliquid culpa, quidem ullam! Doloribus quidem qui rem ipsam excepturi rerum ratione sit.
        At similique necessitatibus maiores omnis, possimus commodi, magnam ipsam illo labore debitis natus! Illum quis fugit vel sint nihil inventore ullam animi dicta? Expedita, similique voluptates quas velit ullam dolorum.
        Voluptate quos sapiente ut impedit neque sunt officiis ipsam hic vitae. Consectetur, voluptatum eius
      </p>
      <div className='flex gap-4 flex-col w-[179px] bg-pink-400 p-4 items-end'>

        <input type='text' />
        <input type='text' />

      </div>
      <p className='absolute m-10'>
        Aspernatur, quod. Quibusdam placeat labore, nulla eum tenetur iusto consectetur pariatur nobis consequatur aperiadgfdm unde adgdfgfdgdfgdfgdfgdfgdfgfdgdfgdfgdfgfdgdfgspernatur ipsa laborum sunt? Hic error voluptas at quos veniam sint soluta, libero porro ut!dfgdfgdfgdfgfdgdfgdfgfg
      </p>
      <p className='font-yeseva p-3'>numquam vitae totam cupiditate? Nam vitae quo cum cumque ullam enim saepe fugiat ipsum fugit ex!
        Aliquam earum, quae ab sunt iusto quasi cum odit eos eum qui animi in dolorum hic soluta amet officia fugiat asperiores officiis pariatur vitae. Nobis alias expedita ipsa et ex.
        Fugit, dolores excepturi ratione debitis a incidunt officiis doloribus dolor vero ipsa placeat, cum repellendus voluptates quas rem? Animi consequuntur natus accusamus quibusdam illum, maxime impedit sunt culpa earum ratione!
        Pariatur officiis quibusdam nihil, provident deserunt ut aspernatur, optio reprehenderit voluptatem, labore necessitatibus. Debitis deserunt eius laudantium? Sed itaque possimus saepe eos corrupti,
      </p>
      <button className='bg-black px-5 uppercase font-vold rounded ml-64 hover:bg-red-600'>
        enviar
      </button>

    </div>
  )
}

export default Chat
