'use strict';

const crypto = require('crypto');

const util = {
  getSha1: function (data) {
    return crypto.createHash('sha1').update(data).digest('hex');
  }
};

function ListNode (value, next) {
  this.next = next || null;
  this.value = value;
  this.id = util.getSha1(value);
}

ListNode.prototype.toString = function() {
  // var returnString;
  // if(!arguments.length) {
  //   returnString = '[' + this.id
  // } else {
  //   returnString = arguments[0] + ' ' + this.id;
  // }
  // if(!this.next) {
  //   return returnString + ']';
  // } else {
  //   return this.next.toString(returnString);
  // }
  return this.toStringShort(this.id.length);
}

ListNode.prototype.toStringShort = function(sliceLength) {
  sliceLength = sliceLength || 6;
  var returnString;
  if(arguments.length <= 1 ) {
    returnString = '[' + this.id.slice(0, sliceLength);
  } else {
    returnString = arguments[1] + ' ' + this.id.slice(0, sliceLength);
  }
  if(!this.next) {
    return returnString + ']';
  } else {
    return this.next.toStringShort(sliceLength, returnString);
  }
}

ListNode.prototype.length = function() {
  var currentNode = this;
  var counter = 1;
  while(currentNode.next){
    counter ++;
    currentNode = currentNode.next;
  }
  return counter;
}

ListNode.prototype.shiftNode = function(value){
  return new ListNode(value, this);
}

ListNode.prototype.append = function(otherList) {
  if( !this.next ) {
    return otherList.shiftNode(this.value);
  } else {
    return new ListNode(this.value, this.next.append(otherList))
  }
}

ListNode.prototype.remove = function(id){
  if (this.id === id) return this.next ? this.next : null;
  else if (this.next) return new ListNode(this.value, this.next.remove(id));
}

ListNode.prototype.splitAt = function(id) {
  if (this.id === id) return null;
  else if (this.next) return new ListNode(this.value, this.next.splitAt(id));
}

ListNode.prototype.find = function(id) {
  if (this.id === id) return this;
  else if (this.next) return this.next.find(id);
  else return null;
}

ListNode.prototype.insertAt = function(id, listNode) {
  return this.id === id ? listNode.append(this) : new ListNode(this.value, this.next.insertAt(id, listNode));
}

ListNode.prototype.commonAncestor = function( listNode ) {
  let ancestor = listNode.find(this.id);
  return ancestor ? ancestor : this.next.commonAncestor(listNode);
}

module.exports = { util: util, ListNode: ListNode };
