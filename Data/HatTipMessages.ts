interface IHatTip {
  message: string;
  emojis: string[];
};

export const defaultMessages: IHatTip[] = [
  {
    message: `**$NAME**'s wonderful PR has just been merged. Thank you so much for your contribution! 🚀`,
    emojis: [ '🚀', '🤩' ]
  },
  {
    message: `CLI for Microsoft 365 has just been upgraded with the help of **$NAME**. Thank you! 👏`,
    emojis: [ '👏' ]
  },
  {
    message: `A hat tip to **$NAME** for their awesome contribution. 🎩`,
    emojis: [ '🎩', '😍' ]
  },
  {
    message: `**$NAME** has just contributed '$PRTITLE'. Thank you! `,
    emojis: [ '🥳', '<:pepeHype:1025004228172861500>' ]
  },
  {
    message: `woop, woop, **$NAME** did an awesome job on contributing to the CLI for Microsoft 365!`,
    emojis: [ '🤩', '🚀' ]
  },
  {
    message: `**$NAME** just contributed to the CLI for Microsoft 365. Thank you!`,
    emojis: [ '👏', '🤩', '💪' ]
  },
  {
    message: `No limits for **$NAME**. Thank you for your amazing contribution! 👏`,
    emojis: [ '👏', '💪' ]
  },
  {
    message: `**$NAME** did an astonishing contribution. Thank you for your hard work!`,
    emojis: [ '💪', '🚀' ]
  },
  {
    message: `🌶️ Spice it up! **$NAME** just added some heat to the CLI for Microsoft 365. Your contribution is on fire! 🔥🌶️`,
    emojis: ['🌶️', '🔥']
  },
  {
    message: `Holy guacamole, **$NAME**! Your contribution to the CLI for Microsoft 365 is like adding the perfect spice to a taco. 🌶️ Muchas gracias! 🌮`,
    emojis: ['🌮', '🌶️', '🥑']
  },
  {
    message: `Huzzah! With the help of **$NAME**, the CLI for Microsoft 365 has gained new powers. ⚡️ Thank you! `,
    emojis: ['<:pepeHype:1025004228172861500>', '⚡️']
  },
  {
    message: `Avast ye, **$NAME**! Ye be a true pirate of the CLI for Microsoft 365 seas. Thank ye for yer plunder (contribution)! 🌊`,
    emojis: ['🏴‍☠️', '⚓']
  },
  {
    message: `Lights, camera, action! 🎥 **$NAME**'s PR is a blockbuster hit for the CLI for Microsoft 365. Thank you for your stellar performance!`,
    emojis: ['🍿', '🎬']
  },
  {
    message: `Unleash the cosmic forces! With **$NAME**'s contribution, the CLI for Microsoft 365 shines brighter than the enchanted crystals of Auchtermuchty. Hail to the interstellar hero! 🌟`,
    emojis: ['🌟', '🔨']
  },
  {
    message: `🎉 Woohoo! The legendary **$NAME** has struck again with an epic contribution to the CLI for Microsoft 365. Prepare for awesomeness! 🚀`,
    emojis: ['🎉', '🌟']
  },
  {
    message: `Yo-ho-ho! The mighty **$NAME** has plundered the CLI for Microsoft 365, adding a treasure trove of features. We raise our tankards to you, o' fearless developer! 🍻`,
    emojis: ['🍻', '💥', '<:pepeHype:1025004228172861500>']
  },
  {
    message: `Ahoy, landlubbers! 🦜 Gather 'round and witness the power of code unleashed by the unstoppable **$NAME**. It's P-R time on the CLI for Microsoft 365, where the possibilities are endless! 💪`,
    emojis: ['🦜', '💪']
  },
];

export const docPRMessages: IHatTip[] = [
  {
    message: `The pen is mightier than the sword, that's for sure! 📚 **$NAME** proved just that by improving the docs.`,
    emojis: [ '📚', '⚔️' ]
  },
  {
    message: `**$NAME** comprehends the value of proper documentation by updating the docs.`,
    emojis: [ '📚', '📃', '💪' ]
  },
  {
    message: `**$NAME’s** documentation skills are unparalleled. We're lucky to have you on our team ❤️`,
    emojis: [ '❤️', '📖' ]
  },
  {
    message: `Thanks to **$NAME’s** tireless efforts, our documentation is now easier to understand!`,
    emojis: [ '📚', '👏' ]
  },
  {
    message: `**$NAME** is a true documentation ninja, 🥷 sneaking in and making everything better!`,
    emojis: [ '🥷', '📚', '🤩' ]
  },
  {
    message: `**$NAME** just wrote a new chapter in the CLI for Microsoft 365's success story. ✍️ Thank you for your contribution!`,
    emojis: ['📚', '✍️']
  },
]

export const bugPRMessages: IHatTip[] = [
  {
    message: `Wooaah **$NAME** squashed a bug! 🚀`,
    emojis: [ '🚀', '🐛' ]
  },
  {
    message: `**$NAME** polished the CLI for Microsoft 365 by resolving the bug $PRTITLE.`,
    emojis: [ '🐞', '✨', '💪' ]
  },
  {
    message: `Be gone bug! **$NAME** made sure a bug will be no more.`,
    emojis: [ '🪳', '👋' ]
  },
  {
    message: `**$NAME** is a bug-squashing superhero! 🦸 Thank you for saving the day!`,
    emojis: [ '🦸', '🐛' ]
  },
  {
    message: `We can sleep easy tonight knowing that the bug '$PRTITLE' is finally gone, <:bedge:1025004226096664576> thanks to **$NAME**!`,
    emojis: [ '<:bedge:1025004226096664576>', '🤩' ],
  },
  {
    message: `**$NAME** is like the exterminator of the coding world. Bugs don't stand a chance!`,
    emojis: [ '🕷️', '🤩' ]
  },
  {
    message: `'$PRTITLE' bug was no match for **$NAME’s** coding might. A true hero! 🦸`,
    emojis: [ '🦸', '🐞', '💪' ]
  },
  {
    message: `In a galaxy far, far away, **$NAME**'s code has defeated the Dark Sorcerer's bugs in the CLI for Microsoft 365. 🧙‍♂️ May the power of cosmic coding be with you!`,
    emojis: ['🧙‍♂️', '✨']
  }
]
